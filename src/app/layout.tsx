import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atmosphere — Fluent Acrylic Weather",
  description: "A modern acrylic weather dashboard inspired by Rocksdanister Weather",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}