import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pump Perfection - Gas Station Simulator",
  description: "A humorous mobile-web game where players must precisely stop filling their gas tank at an exact dollar amount",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
