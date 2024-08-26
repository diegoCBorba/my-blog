import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Divider, ThemeProvider } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const open_sans = Open_Sans({ subsets: ["latin"] });

const styleContainer = {}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Navbar/>
        <div style={{ display: "flex", flexDirection: "row", margin: "auto", maxWidth: "1680px", padding: "4rem 2rem", gap: "1rem" }}>
          <Sidebar/>
          {children}
        </div>
        <Divider/>
        <Footer/>
      </body>
    </html>
  );
}
