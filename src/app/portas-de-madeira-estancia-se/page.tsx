import React from "react";
import { Metadata } from "next";
import { 
  SeoHeader, 
  SeoFAQ, 
  SeoForm, 
  SeoFooter 
} from "../components/SeoComponents";
import { 
  DoorOpen, 
  Phone 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portas de Madeira em Estância-SE | Pivotantes, Maciças e Kit Pronta | Só Madeiras",
  description: "Loja de Portas de Madeira em Estância-SE. Encontre portas pivotantes, portas de entrada maciças, portas semiocas e kits completos de aduela e alisares.",
  alternates: {
    canonical: "https://somadeiras.com.br/portas-de-madeira-estancia-se",
  },
  openGraph: {
    title: "Portas de Madeira em Estância-SE | Pivotantes, Maciças e Kit Pronta | Só Madeiras",
    description: "Compre portas de madeira direto de fábrica com os melhores preços em Estância-SE. Portas maciças, pivotantes e internas com pronta entrega na região sul de Sergipe.",
    url: "https://somadeiras.com.br/portas-de-madeira-estancia-se",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PortasDeMadeiraEstanciaPage() {
  const pageTitle = "Portas de Madeira em Estância-SE";
  const whatsappNumber = "5579996298990";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/portas-de-madeira-estancia-se/#localbusiness",
        "name": "Só Madeiras - Portas de Madeira Estância",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99629-8990",
        "url": "https://somadeiras.com.br/portas-de-madeira-estancia-se",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rodovia BR-101, Km 142",
          "addressLocality": "Estância",
          "addressRegion": "SE",
          "addressCountry": "BR"
        },
        "priceRange": "$$"
      }
    ]
  };

  const faqItems = [
    {
      question: "Quais modelos de portas de madeira vocês vendem em Estância?",
      answer: "Trabalhamos com Portas Pivotantes Maciças para fachada, Portas Maciças Frisadas, Portas Semiocas para quartos/banheiros, Alisares, Aduelas (batentes) e Puxadores de Inox."
    },
    {
      question: "Vocês fornecem o kit porta pronta montado?",
      answer: "Sim! Disponibilizamos o kit completo com a folha da porta, aduela (marco), alisar e fechadura selecionada."
    },
    {
      question: "Qual a madeira recomendada para a porta de entrada da casa?",
      answer: "Recomendamos madeiras nobres de alta densidade como Maçaranduba, Tauari e Angelim, preparadas com verniz de proteção contra umidade."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-neutral-950 text-brown-dark dark:text-neutral-100 font-sans transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SeoHeader pageTitle={pageTitle} whatsappNumber={whatsappNumber} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <DoorOpen className="w-4 h-4" /> Portas Maciças e Pivotantes em Estância-SE
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Portas de Madeira em <span className="text-amber-500">Estância - SE</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            As portas de entrada e internas mais elegantes de Sergipe. Modelos pivotantes, maciços e kits completos com entrega expressa em Estância e região Sul.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20ver%20o%20catálogo%20de%20Portas%20de%20Madeira%20em%20Estância-SE.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Solicitar Catálogo e Orçamento
            </a>
          </div>
        </div>
      </section>

      {/* Grid de Destaques */}
      <section id="produtos" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
            Nossa Linha Principal de Portas
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">Qualidade de fábrica para valorizar a fachada do seu imóvel em Estância</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">Portas Pivotantes Maciças</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Imponentes portas de entrada com tamanhos de até 1,20m x 2,40m. Acompanha pivô em inox e suporte para puxadores de grande porte.
            </p>
            <span className="text-xs font-bold text-neutral-500">Maciça Tauari / Maçaranduba</span>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">Portas Semiocas Internas</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Solução prática e econômica para quartos, escritórios e banheiros. Excelente acabamento pronto para pintura ou verniz.
            </p>
            <span className="text-xs font-bold text-neutral-500">Variedade de Medidas Padrão</span>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-amber-600 dark:text-amber-400">Kits de Aduela e Alisares</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Marcos de madeira de 10cm, 12cm e 15cm com borrachas de vedação antirruído e acabamentos em alisares de madeira nobre.
            </p>
            <span className="text-xs font-bold text-neutral-500">Kit Completo de Instalação</span>
          </div>
        </div>
      </section>

      <section id="orcamento" className="py-16 px-6 max-w-4xl mx-auto">
        <SeoForm pageTitle={pageTitle} whatsappNumber={whatsappNumber} />
      </section>

      <section id="faq" className="py-16 px-6 max-w-4xl mx-auto">
        <SeoFAQ items={faqItems} />
      </section>

      <SeoFooter />
    </div>
  );
}
