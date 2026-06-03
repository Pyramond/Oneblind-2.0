import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="h-screen">
        <Analytics />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
