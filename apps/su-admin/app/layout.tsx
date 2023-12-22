import type { Metadata } from "next";
import "./globals.scss";
import { cn } from "@repo/ui/shadCnUtils";
import { ThemeProvider } from "@repo/ui/themeProvider";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import TanstackProvider from "@repo/ui/TanstackProvider";
import "../../../packages/ui/config/globals.css"

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PurePride Pharma",
  description: "Dashboard to manage your products and orders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors={true} />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
