import './globals.css';

export const metadata = {
  title: 'Sketch2App AI | Turn Hand-Drawn Sketches into Functional Web Apps',
  description:
    'Convert hand-drawn website sketches and wireframes into complete, responsive HTML/CSS web applications using Google Gen AI and Gemma 4.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  keywords: [
    'Sketch to Code',
    'Gemma 4',
    'Google Gen AI',
    'Wireframe to HTML',
    'AI Web Builder',
    'Frontend Generator',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
