import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spark | Lærðu að vinna með gervigreind",
  description: "AI Fluency platform fyrir börn 10-14 ára. Lærðu að nota gervigreind á ábyrgan og markvissan hátt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
