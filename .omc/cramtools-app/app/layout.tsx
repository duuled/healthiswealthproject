import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CramTools — AI Tools That Actually Save Time",
  description:
    "Find and use the RIGHT AI tools for your specific workflow. ToolMatch recommends your perfect AI stack. PromptLab sharpens your prompts. No hype. Just leverage.",
  keywords: [
    "AI tools",
    "productivity",
    "freelancers",
    "solopreneurs",
    "prompt engineering",
    "tool recommendations",
  ],
  openGraph: {
    title: "CramTools — AI Tools That Actually Save Time",
    description:
      "Find and use the RIGHT AI tools for your specific workflow. No hype. Just leverage.",
    url: "https://cramtools.dev",
    siteName: "CramTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CramTools — AI Tools That Actually Save Time",
    description:
      "Find and use the RIGHT AI tools for your specific workflow. No hype. Just leverage.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
