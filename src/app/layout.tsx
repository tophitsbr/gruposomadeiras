import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalPopup from "./components/GlobalPopup";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

// Production Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-V5NDS9FLS6";
// Production Google Search Console Verification Code
const GOOGLE_VERIFICATION_CODE = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google_site_verification_placeholder_token";

export const metadata: Metadata = {
  title: "SÓ MADEIRAS | Tudo para sua obra em um só lugar",
  description: "Loja premium de materiais de construção e madeiras. Compre pelo WhatsApp com atendimento especializado, orçamentos rápidos e entrega rápida na sua região.",
  verification: {
    google: GOOGLE_VERIFICATION_CODE,
  },
  openGraph: {
    title: "SÓ MADEIRAS | Tudo para sua obra em um só lugar",
    description: "Faça seu orçamento de material de construção e madeiras diretamente pelo WhatsApp. Entrega ágil, preços baixos e produtos premium.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-bg text-brown-dark transition-colors duration-300 dark:bg-dark-bg dark:text-gray-100">
        {/* Google Analytics 4 Script (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {children}
        <GlobalPopup />
      </body>
    </html>
  );
}


