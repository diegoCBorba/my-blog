import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import Provider from "@/utils/Providers";
import theme from "@/theme";

import "./globals.css";

export const metadata: Metadata = {
  title: "Diego Cardoso",
  description: "Meu blog pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AppRouterCacheProvider options={{ enableCssLayer: false }}>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Navbar/>
              <div style={{ display: "flex", flexDirection: "row", margin: "auto", maxWidth: "1680px", padding: "4rem 2rem", gap: "1rem" }}>
                <Sidebar/>
                {children}
              </div>
              <Divider/>
              <Footer/>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}

