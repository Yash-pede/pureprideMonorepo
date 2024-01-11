import type { Metadata } from "next";
import "./globals.scss";
import { cn } from "@repo/ui/shadCnUtils";
import { ThemeProvider } from "@repo/ui/themeProvider";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import TanstackProvider from "@repo/ui/TanstackProvider";
import "../../../packages/ui/config/globals.css";
import { DarkmodeGradiant } from "@repo/ui/components";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Admin PurePride Pharma",
  description: "Dashboard to manage your products and orders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <main className="relative z-10">
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
        </main>
        <DarkmodeGradiant />
      </body>
    </html>
  );
}
