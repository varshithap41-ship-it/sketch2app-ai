# 🎨 Sketch2App AI

> Transform hand-drawn website wireframes and napkin sketches into fully responsive, interactive HTML/CSS web applications using **Google Gen AI** and **Gemma 4** (`gemma-4-26b-a4b-it`).

[![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![Google Gen AI](https://img.shields.io/badge/Google%20Gen%20AI-SDK%20%40google%2Fgenai-blue?logo=google)](https://aistudio.google.com/)
[![Model](https://img.shields.io/badge/Model-Gemma%204%20(gemma--4--26b--a4b--it)-purple)](https://aistudio.google.com/)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## ✨ Features

- **💜 Modern Purple & White UI**: Clean, glassmorphic layout optimized for hackathon presentations and developer productivity.
- **📷 Multi-Format Sketch Upload**: Upload hand-drawn wireframes, digital mockups, or paper sketches in **PNG**, **JPEG**, or **WEBP** format (strictly enforced 5 MB size limit).
- **👁️ Live Sketch Preview & Preset Samples**: Preview uploaded images with metadata, or pick from pre-loaded wireframe presets (SaaS landing page, E-commerce showcase, Creative portfolio) for instant 1-click testing.
- **🧠 Gemma 4 Vision Analysis**: Powered by Google's multimodal **Gemma 4** model (`gemma-4-26b-a4b-it`) via `@google/genai` to analyze spatial hierarchy, headings, buttons, card grids, navigation bars, and inputs.
- **🛡️ Sandboxed Interactive Preview**: Live renders generated HTML in an isolated iframe (`sandbox="allow-scripts allow-modals allow-forms"`), keeping execution safe and isolated from the host app.
- **📱 Responsive Device Switcher**: Test how your generated site looks on **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)** viewports in real time.
- **💻 Source Code Inspector**: View generated HTML5, embedded CSS, and JavaScript with character/line counters and a 1-click clipboard copy button.
- **⚡ AI-Powered Iterative Editing**: Enter natural-language instructions (e.g. *"change button color to royal blue"*, *"add a 3-tier pricing table"*, *"make navbar sticky"*) to iteratively refine the code without starting from scratch.
- **💾 One-Click HTML Download**: Export self-contained, standalone `.html` files ready to open in any web browser.
- **🔒 Server-Side Security**: All API keys and Gemini interactions run securely on the server via Next.js Route Handlers (`app/api/generate/route.js`). Never exposed to browser JavaScript.

---

## 🏗️ Technology Stack

| Component | Technology |
|---|---|
| **Framework** | Next.js (App Router) |
| **Frontend** | React 18 / JavaScript / Modern CSS3 |
| **AI SDK** | `@google/genai` (Google Gen AI JavaScript SDK) |
| **AI Model** | Gemma 4 (`gemma-4-26b-a4b-it`) |
| **Deployment** | Vercel Serverless Functions |

---

## 📁 Project Architecture

```
sketch2app-ai/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js       # Server-side API route (handles Gemma 4 generation & edits)
│   ├── globals.css            # Purple-and-white theme styling, animations, responsiveness
│   ├── layout.js              # Next.js App Router Root Layout
│   └── page.js                # Interactive client application & state management
├── public/
│   └── samples/               # Demo assets & wireframes
├── .env.local.example         # Template for environment configuration
├── .gitignore                 # Standard git ignore rules (protects API keys)
├── next.config.mjs            # Next.js build configuration
├── package.json               # NPM dependencies and scripts
└── README.md                  # Project documentation & deployment guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** 18.17.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm** (bundled with Node.js) or **pnpm** / **yarn**
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Installation
Clone or navigate to the project directory:

```bash
cd sketch2app-ai
npm install
```

### 3. Configure Environment Variables
Create your local `.env.local` configuration:

```bash
cp .env.local.example .env.local
```

Open `.env.local` in an editor and insert your Gemini API Key:

```env
# Required: Your Gemini API Key from Google AI Studio
GEMINI_API_KEY=AIzaSyYourActualKeyHere

# Optional: Supported Gemma model (defaults to gemma-4-26b-a4b-it)
GEMMA_MODEL=gemma-4-26b-a4b-it
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧪 Testing the Application

### Option A: 1-Click Preset Demo (Fastest)
1. In the left panel under **"No sketch ready? Try a sample"**, click **"SaaS Landing Page"** or **"E-Commerce Store"**.
2. Notice the sample wireframe sketch and design instructions auto-populate.
3. Click **"Generate Website (Gemma 4)"**.
4. In a few seconds, the interactive sandboxed website and source code will appear in the right panel!

### Option B: Upload Your Own Hand-Drawn Sketch
1. Draw a website layout on a piece of paper or in your favorite drawing app.
2. Drag and drop the `.png`, `.jpg`, or `.webp` file into the upload zone (under 5 MB).
3. (Optional) In the text box, describe your specific color preferences or extra features.
4. Click **"Generate Website (Gemma 4)"**.

### Option C: AI Revisions & Editing
1. Once a website is generated, scroll to the bottom of the right card.
2. In the **AI Website Editor** bar, type instructions like:
   - *"Change all button colors to royal blue and add subtle rounded corners"*
   - *"Add an interactive pricing section with monthly and annual toggle"*
   - *"Make the header sticky and add a backdrop blur effect"*
3. Click **"Update Website"**. Gemma 4 modifies the code while keeping the existing structure intact.
4. Use the **"Revert to v..."** button anytime to undo modifications.

---

## 🚢 GitHub & Vercel Deployment

### Step 1: Initialize Git and Commit
```bash
git init
git add .
git commit -m "Initial commit of Sketch2App AI"
```

### Step 2: Push to GitHub
Create a new repository on [GitHub](https://github.com/new), then run:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sketch2app-ai.git
git push -u origin main
```

*(Note: `.env.local` is listed in `.gitignore` and will never be pushed to GitHub).*

### Step 3: Deploy on Vercel
1. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
2. Import your GitHub repository (`sketch2app-ai`).
3. Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `Your_Google_AI_Studio_API_Key`
   - (Optional) **Key**: `GEMMA_MODEL` | **Value**: `gemma-4-26b-a4b-it`
4. Click **"Deploy"**. Vercel will automatically build the Next.js app and provide a live production URL!

---

## 🛡️ Security & Architecture Best Practices

- **Zero Client-Side Secret Leakage**: The API key is consumed only in `app/api/generate/route.js` on the server runtime.
- **Sandboxed Execution**: Generated websites run inside `<iframe sandbox="allow-scripts allow-modals allow-forms" />` to isolate third-party scripts from host application cookies, storage, or parent DOM.
- **Strict Input Validation**:
  - Validates image MIME types against `['image/png', 'image/jpeg', 'image/jpg', 'image/webp']`.
  - Enforces payload size limit `<= 5 MB` on both client and server.
  - Sanitizes model markdown output down to valid HTML5.
- **Serverless Ready**: Route Handler uses standard Web APIs compatible with Vercel Serverless Functions.

---

## 📄 License
MIT License. Built for hackathon innovation with Google Gen AI.
