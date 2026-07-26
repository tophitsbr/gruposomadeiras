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
  Award, 
  Sparkles, 
  CheckCircle, 
  Check,
  Wrench, 
  ArrowRight, 
  Phone,
  Truck,
  Layers,
  Ruler
} from "lucide-react";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Janelas de Madeira em Sergipe | Venezianas, Correr e Maxiar | Só Madeiras",
  description: "Janelas Venezianas, de Correr, Pivotantes e Maxiar em madeira de lei tratada. Qualidade superior, secagem técnica em estufa e excelente acabamento para sua obra. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/janelas-de-madeira",
  },
  openGraph: {
    title: "Janelas de Madeira em Sergipe | Venezianas, Correr e Maxiar | Só Madeiras",
    description: "Esquadrias de madeira de lei selecionada de alta durabilidade. Vedação ideal contra intempéries e visual nobre para residências rurais ou urbanas.",
    url: "https://somadeiras.com.br/janelas-de-madeira",
    type: "website",
    locale: "pt_BR",
  }
};

export default function JanelasMadeiraPage() {
  const pageTitle = "Janelas de Madeira";
  const whatsappNumber = "5579999999999";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/janelas-de-madeira/#localbusiness",
        "name": "Só Madeiras - Janelas e Esquadrias",
        "image": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/janelas-de-madeira",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rodovia BR-101, Km 142",
          "addressLocality": "Estância",
          "addressRegion": "SE",
          "postalCode": "49200-000",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-11.2682",
          "longitude": "-37.4381"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/janelas-de-madeira/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://somadeiras.com.br/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Janelas de Madeira",
            "item": "https://somadeiras.com.br/janelas-de-madeira"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/janelas-de-madeira/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual madeira é melhor para janelas externas expostas ao sol e chuva?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Angelim Vermelho e o Tauari Seco em Estufa são as melhores espécies para esquadrias externas. Ambas possuem fibras compactas de alta dureza mecânica que não empenam facilmente e absorvem de forma excelente os vernizes protetores náuticos."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona o sistema de Janela Veneziana de madeira?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A janela veneziana possui palhetas (rebojos) inclinadas fixas ou móveis que permitem a ventilação natural permanente e a passagem sutil de iluminação difusa, mantendo a privacidade interna do ambiente mesmo com a folha principal aberta."
            }
          },
          {
            "@type": "Question",
            "name": "As janelas já acompanham trincos e puxadores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. Nossas janelas completas acompanham fechos cremona ou trincos centrais de segurança e puxadores ergonômicos instalados, restando apenas o chumbamento dos batentes de contorno alvenaria."
            }
          }
        ]
      }
    ]
  };

  const faqItems = [
    {
      question: "Qual o melhor tratamento para conservar janelas de madeira contra umidade?",
      answer: "Recomenda-se aplicar de duas a três demãos de Stain protetor impregnante ou verniz poliuretano náutico triplo filtro solar. O Stain é preferível para áreas externas pois penetra nas fibras celulares e não descasca sob a incidência direta de radiação solar UV intensa."
    },
    {
      question: "Como evitar que as folhas da janela emperrem ou raspem nos batentes?",
      answer: "A chave está na secagem da madeira. Nossas janelas são confeccionadas exclusivamente com madeiras submetidas à secagem industrial computadorizada em estufa, estabilizando a umidade a 12%. Isso reduz a quase zero a dilatação higroscópica que faz a esquadria 'inchar' no período chuvoso."
    },
    {
      question: "O que é uma Janela Maxiar e onde ela é indicada?",
      answer: "A janela tipo Maxiar possui eixo de rotação horizontal localizado na travessa superior. Ela projeta a folha para fora na base, sendo ideal para banheiros, lavabos e cozinhas pois oferece excelente controle de ventilação sem permitir a entrada direta de chuvas moderadas."
    }
  ];

  const productsList = [
    {
      title: "Janela Veneziana Pantográfica Angelim",
      desc: "Excelente modelo para quartos residenciais. Palhetas inclinadas fixas que oferecem privacidade, iluminação suave e segurança estrutural pesada.",
      specs: [
        { label: "Material", val: "Angelim Vermelho" },
        { label: "Folhas", val: "4 e 6 folhas de abrir" },
        { label: "Medidas", val: "1,20m x 1,20m e 1,40m x 1,20m" }
      ],
      img: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
      badge: "Campeã de Vendas"
    },
    {
      title: "Janela de Correr Tauari Premium",
      desc: "Folhas de correr paralelas com trilho embutido de alumínio e roldanas de nylon macias. Acompanha grade de proteção de ferro.",
      specs: [
        { label: "Material", val: "Madeira Nobre Tauari" },
        { label: "Vidro", val: "Apto p/ Vidros de 4 a 6mm" },
        { label: "Medidas", val: "1,50m x 1,20m e 2,00m x 1,20m" }
      ],
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      badge: "Moderna"
    },
    {
      title: "Janela Maxiar Angelim Banheiro",
      desc: "Abertura suave projetada para fora. Excelente vedação com borrachas de silicone que reduzem ruídos e infiltrações de chuva.",
      specs: [
        { label: "Material", val: "Angelim Maciço" },
        { label: "Dobradiça", val: "Articulada de Inox" },
        { label: "Medidas", val: "60cm x 60cm e 80cm x 50cm" }
      ],
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop",
      badge: "Imprescindível"
    },
    {
      title: "Janela Pivotante de Vidro e Madeira",
      desc: "Visual requintado contemporâneo. Abertura vertical sobre eixo pivô de inox, ideal para salas de jantar e fachadas de alto padrão.",
      specs: [
        { label: "Design", val: "Eixo Pivotante Central" },
        { label: "Material", val: "Angelim e Vidro Temperado" },
        { label: "Medidas", val: "1,00m x 1,50m sob medida" }
      ],
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      badge: "Sob Encomenda"
    }
  ];

  const regionsText = "Entregamos janelas de madeira nobre e esquadrias sob medida com frota própria em Estância, Aracaju, Itabaiana, Lagarto, Tobias Barreto, Umbaúba, Cristinápolis e norte da Bahia.";

  return (
    <div className="bg-brand-bg dark:bg-dark-bg text-stone-850 dark:text-stone-100 transition-colors duration-300 min-h-screen flex flex-col font-sans">
      
      {/* Dynamic SEO JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <SeoHeader pageTitle={pageTitle} whatsappNumber={whatsappNumber} />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-brown-dark via-stone-900 to-black text-white py-20 px-6 overflow-hidden md:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="bg-primary/20 text-primary border border-primary/30 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Madeira de Lei com Secagem Estufa
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight uppercase">
              Janelas de Madeira <br /> em <span className="text-primary">Sergipe</span>
            </h1>
            
            <p className="text-stone-300 text-sm md:text-lg max-w-2xl leading-relaxed font-light">
              Janelas venezianas de abrir, esquadrias de correr com trilho de alumínio, maxiares e modelos sob medida. Resistência extraordinária às intempéries do clima tropical.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#orcamento"
                className="bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de cotar janelas de madeira nobre para minha obra.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full shadow transition flex items-center gap-2 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Orçar no WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md text-[10px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Madeiras Secas em Estufa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Ferragens Inox de Qualidade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Faturamento Direto CNPJ</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-3xl shadow-2xl relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop" 
                alt="Janela de Madeira Rústica" 
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-103 transition duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <p className="font-bold text-xs text-white uppercase tracking-wider">Veneziana de Madeira Maciça</p>
                <p className="text-[10px] text-stone-300 mt-0.5">Ventilação ideal e segurança física incomparável no quarto do sítio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="beneficios" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Esquadrias de Alta Engenharia
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            VANTAGENS EXCLUSIVAS DAS NOSSAS JANELAS
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Esquadrias fabricadas sob estrito controle tecnológico contra cupins, umidade e empenamentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Madeira Seca em Estufa",
              desc: "A umidade controlada de 12% impede torções nas folhas das janelas e garante que deslizem perfeitamente sem emperrar.",
              icon: Ruler
            },
            {
              title: "Alta Resistência Climática",
              desc: "Madeiras nobres com fibras densas que suportam ciclos intensos de sol e chuva tropical sem perder a integridade estrutural.",
              icon: Shield
            },
            {
              title: "Ferragens e Vedação Vedada",
              desc: "Trilhos de correr de alta durabilidade e dobradiças de inox silenciosas que conferem longevidade e isolamento de vento.",
              icon: Layers
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex items-start gap-4"
              >
                <div className="p-3.5 rounded-2xl flex-shrink-0 bg-amber-500/10 text-amber-600 dark:text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm md:text-base text-brown-dark dark:text-white group-hover:text-primary transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS DISPLAY SECTION */}
      <section id="produtos" className="bg-slate-50 dark:bg-neutral-900/50 py-16 border-y border-stone-250 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Variedades Disponíveis
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              GRADE COMPLETA DE JANELAS DE MADEIRA
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Escolha as dimensões e o modelo ideais para o andamento do seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {productsList.map((prod, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative select-none bg-stone-100">
                  <img 
                    src={prod.img} 
                    alt={prod.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brown-dark text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow">
                    {prod.badge}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm md:text-base text-brown-dark dark:text-white group-hover:text-primary transition line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-stone-550 dark:text-stone-400 leading-normal line-clamp-3 font-light">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <div className="space-y-1.5">
                      {prod.specs.map((sp, sIdx) => (
                        <div key={sIdx} className="flex justify-between text-[10px] md:text-xs">
                          <span className="text-stone-400 font-medium">{sp.label}:</span>
                          <span className="text-brown-medium dark:text-primary font-bold">{sp.val}</span>
                        </div>
                      ))}
                    </div>

                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de fazer um orçamento de janelas de madeira modelo *${encodeURIComponent(prod.title)}*.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition active:scale-95"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Orçar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Central de Ajuda
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            PERGUNTAS SOBRE JANELAS DE MADEIRA
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Esclareça suas dúvidas técnicas e planeje sua instalação perfeitamente.
          </p>
        </div>

        <SeoFAQ items={faqItems} />
      </section>

      {/* FORM CTA */}
      <section id="orcamento" className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 py-16 px-4 border-t border-stone-250 dark:border-dark-border relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-5 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/20 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Orçamento de Janelas Grátis
            </span>
            
            <h2 className="font-display font-black text-2xl md:text-4xl text-brown-dark dark:text-white uppercase leading-tight">
              PRECISA COTAR JANELAS PARA SUA CASA?
            </h2>
            
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              Envie-nos as dimensões das suas aberturas de parede e nossa equipe de orçamentistas calculará o encaixe exato de marcos, guarnições e o frete de pátio direto!
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Opções Sob Medida</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Fabricamos janelasVenezianas de 4 ou 6 folhas e maxiares de acordo com o tamanho da sua planta civil.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Pronto Faturamento Sergipe</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Entrega imediata p/ lotes padrão em estoque com faturamento direto CNPJ ou produtor rural.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 w-full">
            <SeoForm pageTitle={pageTitle} whatsappNumber={whatsappNumber} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <SeoFooter pageTitle={pageTitle} regionsText={regionsText} whatsappNumber={whatsappNumber} />

    </div>
  );
}
