import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gas Station Simulator",
  description: "A polished browser game where players stop a gas pump on the perfect dollar target.",
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
