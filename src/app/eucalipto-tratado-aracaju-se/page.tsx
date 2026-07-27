import React from "react";
import { Metadata } from "next";
import { 
  SeoHeader, 
  SeoFAQ, 
  SeoForm, 
  SeoFooter 
} from "../components/SeoComponents";
import { 
  Shield, 
  TreePine, 
  Phone,
  Truck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Eucalipto Tratado em Aracaju-SE | Mourões e Postes Autoclavados | Só Madeiras",
  description: "Compre Eucalipto Tratado de alta durabilidade em Aracaju-SE. Mourões, postes, vigas e roliços com entrega rápida para Aracaju e toda região metropolitana.",
  alternates: {
    canonical: "https://somadeiras.com.br/eucalipto-tratado-aracaju-se",
  },
  openGraph: {
    title: "Eucalipto Tratado em Aracaju-SE | Mourões e Postes Autoclavados | Só Madeiras",
    description: "Fornecimento de Eucalipto Tratado em Autoclave em Aracaju. Alta resistência contra cupins, brocas e umidade para pergolados, decks e cercamento.",
    url: "https://somadeiras.com.br/eucalipto-tratado-aracaju-se",
    type: "website",
    locale: "pt_BR",
  }
};

export default function EucaliptoTratadoAracajuPage() {
  const pageTitle = "Eucalipto Tratado em Aracaju-SE";
  const whatsappNumber = "5579996298990";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/eucalipto-tratado-aracaju-se/#localbusiness",
        "name": "Só Madeiras - Eucalipto Tratado Aracaju",
        "image": "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99629-8990",
        "url": "https://somadeiras.com.br/eucalipto-tratado-aracaju-se",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Atendimento Aracaju e Região Metropolitana",
          "addressLocality": "Aracaju",
          "addressRegion": "SE",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -10.9472,
          "longitude": -37.0731
        },
        "priceRange": "$$"
      }
    ]
  };

  const faqItems = [
    {
      question: "Qual a garantia do eucalipto tratado entregue em Aracaju?",
      answer: "Nossos roliços e postes de eucalipto passam por tratamento industrial sob pressão em autoclave (Garantia de até 15 anos contra cupins e apodrecimento)."
    },
    {
      question: "Vocês entregam eucalipto tratado direto na obra em Aracaju?",
      answer: "Sim! Entregamos em todos os bairros de Aracaju (Jardins, Aruana, Atalaia, Coroa do Meio, Farolândia, Centro) e cidades vizinhas como Socorro e São Cristóvão."
    },
    {
      question: "Quais diâmetros de eucalipto tratado estão disponíveis?",
      answer: "Trabalhamos com bitolas que variam de 8-10 cm a 18-20 cm, em comprimentos de 2,20m até 8 metros."
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Truck className="w-4 h-4" /> Entrega Rápida em Aracaju e Região
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Eucalipto Tratado em <span className="text-amber-500">Aracaju - SE</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Roliços, mourões e postes autoclavados para cercas rurais, pergolados gourmets, decks e estruturas de alto padrão com imunização garantida contra pragas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20um%20orçamento%20de%20Eucalipto%20Tratado%20para%20entregar%20em%20Aracaju.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Solicitar Orçamento em Aracaju
            </a>
          </div>
        </div>
      </section>

      {/* Grid de Benefícios */}
      <section id="beneficios" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="bg-amber-100 dark:bg-amber-950/50 p-4 rounded-2xl text-amber-600 dark:text-amber-400 w-fit mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Imunização em Autoclave</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Tratamento com CCA sob vácuo-pressão que penetra até o cerne da madeira, garantindo resistência contra cupins e umidade litorânea de Aracaju.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="bg-amber-100 dark:bg-amber-950/50 p-4 rounded-2xl text-amber-600 dark:text-amber-400 w-fit mb-6">
              <TreePine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Sustentabilidade 100%</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Madeira proveniente de florestas de reflorestamento renováveis, combinando responsabilidade ambiental e extrema durabilidade.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
            <div className="bg-amber-100 dark:bg-amber-950/50 p-4 rounded-2xl text-amber-600 dark:text-amber-400 w-fit mb-6">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Logística Própria para SE</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Frota pronta para descarregar diretamente no seu canteiro de obras em Aracaju, Aruana, Socorro e região.
            </p>
          </div>
        </div>
      </section>

      {/* Tabela de Produtos */}
      <section id="produtos" className="py-16 px-6 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
              Dimensões e Roliços para Pronta Entrega
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">Atendemos construções civis, obras rurais e projetos arquitetônicos em Aracaju</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mourões para Cerca", size: "Diâmetro 8-10 cm • Comp: 2,20m", desc: "Ideal para estancamento rural e delimitação de lotes." },
              { title: "Postes de Pergolado", size: "Diâmetro 12-14 cm • Comp: 3,00m a 6,00m", desc: "Estruturas robustas para áreas gourmet e garagens." },
              { title: "Vigas e Caibros Roliços", size: "Diâmetro 10-12 cm • Comp: 3,00m a 7,00m", desc: "Suporte de cobertura para quiosques e pergolados." },
            ].map((prod, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white mb-2">{prod.title}</h3>
                <span className="inline-block bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-md mb-3">{prod.size}</span>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário & FAQ */}
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
