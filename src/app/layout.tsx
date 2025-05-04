import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "Gas Station Simulator",
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
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
