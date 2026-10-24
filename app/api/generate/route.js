import { NextResponse } from 'next/server';

// Set maximum duration for Vercel Serverless Function (if supported by plan)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * Clean and extract raw HTML from model output, handling potential markdown code blocks.
 */
function cleanModelOutputToHtml(text) {
  if (!text) return '';
  let cleaned = text.trim();

  // Match ```html ... ``` or general ``` ... ``` blocks
  const markdownMatch = cleaned.match(/```(?:html|xml)?\s*([\s\S]*?)\s*```/i);
  if (markdownMatch && markdownMatch[1]) {
    cleaned = markdownMatch[1].trim();
  } else {
    // If output starts with ```, strip it
    cleaned = cleaned.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  // Ensure output begins with an HTML tag or doctype
  const htmlStartIndex = cleaned.search(/<!DOCTYPE html|<html/i);
  if (htmlStartIndex > 0) {
    cleaned = cleaned.substring(htmlStartIndex);
  }

  return cleaned;
}

/**
 * Calculates raw byte size of a base64 encoded string.
 */
function getBase64ByteSize(base64String) {
  const padding = (base64String.match(/=+$/) || [''])[0].length;
  return Math.floor((base64String.length * 3) / 4) - padding;
}

/**
 * Call the Google Gen AI API using either the official SDK or native fetch.
 */
async function callGemmaModel({ apiKey, modelName, contents, systemInstruction }) {
  let textResult = null;
  let sdkError = null;

  // 1. Try using the official @google/genai SDK
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const requestPayload = {
      model: modelName,
      contents: contents,
      config: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    };

    if (systemInstruction) {
      requestPayload.config.systemInstruction = systemInstruction;
    }

    const response = await ai.models.generateContent(requestPayload);

    if (typeof response?.text === 'string') {
      textResult = response.text;
    } else if (typeof response?.text === 'function') {
      textResult = await response.text();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      textResult = response.candidates[0].content.parts
        .map((part) => part.text || '')
        .join('');
    }
  } catch (err) {
    sdkError = err;
    console.warn('[Sketch2App AI] @google/genai SDK invocation fallback trigger:', err?.message || err);
  }

  if (textResult) {
    return textResult;
  }

  // 2. Direct Google Gen AI REST API Fallback (for resilience & universal compatibility)
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    modelName
  )}:generateContent?key=${apiKey}`;

  const restBody = {
    contents: contents,
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  };

  if (systemInstruction) {
    restBody.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restBody),
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    let parsedMessage = errorDetails;
    try {
      const parsed = JSON.parse(errorDetails);
      parsedMessage = parsed.error?.message || errorDetails;
    } catch (_) {}

    throw new Error(
      `Google Gen AI API error (${res.status}): ${parsedMessage}` +
        (sdkError ? ` (SDK message: ${sdkError.message})` : '')
    );
  }

  const data = await res.json();
  const candidatePart = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidatePart) {
    throw new Error('Google Gen AI API returned empty or filtered content response.');
  }

  return candidatePart;
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMMA_MODEL || 'gemma-4-26b-a4b-it';

    // Verify API Key configuration
    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY is not configured on the server. Please add your Google Gemini API key to .env.local or your Vercel project environment variables.',
          code: 'MISSING_API_KEY',
        },
        { status: 401 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      return NextResponse.json(
        { error: 'Invalid JSON payload in request body.', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    const { action = 'generate', imageBase64, mimeType, prompt, currentHtml, instruction } = body;

    // Handle Generation Action
    if (action === 'generate') {
      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return NextResponse.json(
          { error: 'An image sketch is required for generation.', code: 'MISSING_IMAGE' },
          { status: 400 }
        );
      }

      // Extract raw base64 data and mimeType if data URL was sent
      let rawBase64 = imageBase64;
      let effectiveMime = mimeType || 'image/png';

      if (imageBase64.startsWith('data:')) {
        const matches = imageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          effectiveMime = matches[1].toLowerCase();
          rawBase64 = matches[2];
        }
      }

      // Normalize mime type
      if (effectiveMime === 'image/jpg') effectiveMime = 'image/jpeg';

      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(effectiveMime)) {
        return NextResponse.json(
          {
            error: `Unsupported image format (${effectiveMime}). Allowed formats: PNG, JPEG, and WEBP.`,
            code: 'INVALID_IMAGE_TYPE',
          },
          { status: 400 }
        );
      }

      // Validate size
      const byteSize = getBase64ByteSize(rawBase64);
      if (byteSize > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          {
            error: `The uploaded image (${(byteSize / (1024 * 1024)).toFixed(2)} MB) exceeds the 5 MB limit.`,
            code: 'IMAGE_TOO_LARGE',
          },
          { status: 413 }
        );
      }

      const systemInstruction = `You are Sketch2App AI, an expert frontend engineer and UI/UX designer.
Your task is to analyze hand-drawn wireframes and UI sketches and translate them into complete, production-ready, responsive, self-contained single-file HTML/CSS web applications.

Strict Rules:
1. Output ONLY the raw HTML code. Do NOT wrap it in conversational text or markdown explanation.
2. Return a complete <!DOCTYPE html> document with standard <head>, <meta name="viewport" content="width=device-width, initial-scale=1.0">, and <body>.
3. Include all CSS inside a <style> block in the <head>. Use modern CSS (Flexbox, CSS Grid, CSS variables, clean typography, smooth transitions).
4. Match the wireframe's layout, components (navigation bar, hero section, card grids, forms, buttons, sidebars, footer) accurately.
5. Apply a polished, modern purple-and-white theme by default (violet/purple primary accents: #7c3aed, deep purple #4c1d95, clean white cards #ffffff, soft backgrounds #f8fafc, elegant typography).
6. If the sketch has interactive elements (e.g. mobile hamburger menu, modal, accordions, simple form submission notification), add lightweight vanilla JavaScript inside a <script> tag before </body>.
7. Use placeholder images via https://placehold.co or SVG icons if the sketch depicts images or icons.
8. Make the generated layout fully responsive on mobile, tablet, and desktop screens.`;

      const userPromptText = `Analyze this hand-drawn website sketch in detail.
Identify all sections, buttons, headings, card grids, forms, search bars, inputs, icons, and layout structure.
${prompt && prompt.trim() ? `User Design Notes & Preferences: "${prompt.trim()}"` : ''}

Generate the complete, responsive, self-contained HTML/CSS web page matching this sketch.`;

      const contents = [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: effectiveMime,
                data: rawBase64,
              },
            },
            {
              text: userPromptText,
            },
          ],
        },
      ];

      const rawModelOutput = await callGemmaModel({
        apiKey,
        modelName,
        contents,
        systemInstruction,
      });

      const cleanHtml = cleanModelOutputToHtml(rawModelOutput);

      return NextResponse.json({
        success: true,
        html: cleanHtml,
        model: modelName,
      });
    }

    // Handle Edit Action
    if (action === 'edit') {
      if (!currentHtml || typeof currentHtml !== 'string') {
        return NextResponse.json(
          { error: 'Existing HTML is required to apply modifications.', code: 'MISSING_HTML' },
          { status: 400 }
        );
      }

      if (!instruction || typeof instruction !== 'string' || !instruction.trim()) {
        return NextResponse.json(
          { error: 'An edit instruction is required (e.g., "change button to blue").', code: 'MISSING_INSTRUCTION' },
          { status: 400 }
        );
      }

      const systemInstruction = `You are Sketch2App AI, an expert frontend engineer.
Your task is to modify existing HTML/CSS code according to user instructions (e.g. changing colors, adding new sections, modifying typography, adjusting layout).

Strict Rules:
1. Output ONLY the updated raw HTML code. Do NOT wrap it in conversational text or explanations.
2. Return the complete, valid <!DOCTYPE html> document with all styles and scripts preserved.
3. Precisely execute the user's requested edit while preserving the existing structure, styles, and overall aesthetic.
4. Ensure the resulting HTML remains self-contained, fully functional, and responsive.`;

      const editPromptText = `Here is the current HTML code of the website:
\`\`\`html
${currentHtml}
\`\`\`

User Edit Instruction:
"${instruction.trim()}"

Please apply this instruction and output the complete, updated HTML document.`;

      const parts = [];

      // If original image is optionally provided for visual context
      if (imageBase64 && typeof imageBase64 === 'string') {
        let rawBase64 = imageBase64;
        let effectiveMime = mimeType || 'image/png';
        if (imageBase64.startsWith('data:')) {
          const matches = imageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            effectiveMime = matches[1].toLowerCase();
            rawBase64 = matches[2];
          }
        }
        if (ALLOWED_MIME_TYPES.includes(effectiveMime)) {
          parts.push({
            inlineData: {
              mimeType: effectiveMime,
              data: rawBase64,
            },
          });
        }
      }

      parts.push({ text: editPromptText });

      const contents = [
        {
          role: 'user',
          parts: parts,
        },
      ];

      const rawModelOutput = await callGemmaModel({
        apiKey,
        modelName,
        contents,
        systemInstruction,
      });

      const cleanHtml = cleanModelOutputToHtml(rawModelOutput);

      return NextResponse.json({
        success: true,
        html: cleanHtml,
        model: modelName,
      });
    }

    return NextResponse.json(
      { error: `Unknown action: '${action}'. Expected 'generate' or 'edit'.`, code: 'UNKNOWN_ACTION' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Sketch2App AI] API Route Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'An unexpected error occurred while processing your request with Gemma AI.',
        code: 'GENERATION_ERROR',
      },
      { status: 500 }
    );
  }
}
