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
  TreePine, 
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
  title: "Mourão de Eucalipto Tratado | Estacas e Cercas Rurais | Só Madeiras",
  description: "Compre mourões de eucalipto tratado em autoclave com 15 anos de garantia. Estacas esticadoras roliças de alta resistência para cercas rurais e urbanas. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/mourao-de-eucalipto-tratado",
  },
  openGraph: {
    title: "Mourão de Eucalipto Tratado | Estacas e Cercas Rurais | Só Madeiras",
    description: "Mourões roliços autoclavados sob pressão de alta durabilidade contra cupins e apodrecimento. Ideal para fazendas, cercamentos e divisões de terras.",
    url: "https://somadeiras.com.br/mourao-de-eucalipto-tratado",
    type: "website",
    locale: "pt_BR",
  }
};

export default function MouraoEucaliptoTratadoPage() {
  const pageTitle = "Mourão de Eucalipto Tratado";
  const whatsappNumber = "5579999999999";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/mourao-de-eucalipto-tratado/#localbusiness",
        "name": "Só Madeiras - Mourões de Eucalipto",
        "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/mourao-de-eucalipto-tratado",
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
        "@id": "https://somadeiras.com.br/mourao-de-eucalipto-tratado/#breadcrumb",
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
            "name": "Mourão de Eucalipto Tratado",
            "item": "https://somadeiras.com.br/mourao-de-eucalipto-tratado"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/mourao-de-eucalipto-tratado/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual a profundidade ideal para enterrar o mourão de eucalipto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A recomendação técnica de carpinteiros e engenheiros é enterrar cerca de 60cm a 80cm de profundidade para mourões normais de cerca (2,20m de altura total), compactando bem a terra com brita fina no fundo para drenar a água das chuvas."
            }
          },
          {
            "@type": "Question",
            "name": "Por que o mourão de eucalipto racha e como evitar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pequenas fissuras longitudinais na superfície do eucalipto roliço são normais e decorrem da secagem natural da madeira ao sol. Elas não comprometem a resistência estrutural do mourão, e o tratamento químico em autoclave atinge as camadas mais profundas das fibras, garantindo imunidade permanente."
            }
          },
          {
            "@type": "Question",
            "name": "Qual espaçamento usar entre os mourões em cercas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para cercas de fazenda tradicionais com arame farpado ou arame liso de alta tração, o espaçamento padrão recomendado é de 2,5 metros a 3 metros de distância entre cada mourão."
            }
          }
        ]
      }
    ]
  };

  const faqItems = [
    {
      question: "Qual a profundidade recomendada para enterrar o mourão de eucalipto?",
      answer: "Recomenda-se enterrar de 60cm a 80cm para mourões normais (2,20m) e até 1 metro para mourões cantos e esticadores maiores. Para garantir a melhor vida útil, faça uma camada de drenagem com cascalho no fundo do buraco antes de fincar a madeira e compacte firmemente as laterais com terra batida ou mistura fraca de concreto."
    },
    {
      question: "Qual o espaçamento ideal entre os mourões em uma cerca rural?",
      answer: "O espaçamento padrão de mercado é de 2,5 metros a 3,0 metros de distância. Diante de relevos acidentados ou descidas acentuadas, reduza o espaçamento para 2,0 metros para suportar o peso e a curvatura natural das linhas de arame farpado ou liso."
    },
    {
      question: "Por que o mourão de eucalipto roliço racha longitudinalmente?",
      answer: "As fissuras superficiais (rachaduras longitudinais) são um fenômeno natural da madeira roliça exposta a ciclos de sol e chuva. Como a madeira seca de fora para dentro, as fibras externas encolhem antes das internas, criando pequenas fendas. Isso não afeta a segurança estrutural do mourão, nem reduz a eficácia da autoclave, pois as fibras estão 100% imunizadas contra cupim e fungos."
    },
    {
      question: "Qual mourão deve ser usado para segurar a tensão (esticador)?",
      answer: "Os mourões esticadores sofrem toda a tração dos fios de arame. Por isso, utilize peças de maior diâmetro (diâmetro de 12 a 16cm) instaladas nas pontas, cantos de curvas e a cada 50 a 100 metros de reta na cerca, obrigatoriamente travadas com estribos, escoras rústicas e contra-ventos em diagonal."
    },
    {
      question: "O eucalipto autoclavado é seguro para animais em fazendas?",
      answer: "Sim, perfeitamente seguro. O preservativo químico utilizado no tratamento em autoclave (geralmente CCA) é fixado fisicamente de forma permanente e insolúvel dentro das fibras celulares do eucalipto após a cura industrial. Não ocorre lixiviação ou contaminação do solo, nem apresenta riscos para o gado, cavalos ou culturas agrícolas vizinhas."
    }
  ];

  const productsList = [
    {
      title: "Mourão Padrão de Cerca",
      desc: "Indicado para cercas rurais tradicionais de 4 a 6 fios de arame farpado. Toras perfeitamente descascadas e retas de alta resistência.",
      specs: [
        { label: "Diâmetro", val: "08 a 10 cm" },
        { label: "Comprimento", val: "2,20 metros" },
        { label: "Aplicação", val: "Cercas rurais gerais" }
      ],
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
      badge: "Mais Vendido"
    },
    {
      title: "Mourão de Divisa Reforçado",
      desc: "Excelente para cercamentos em divisas de propriedades vizinhas e cercas de arame liso de alta tração que exigem bitolas mais densas.",
      specs: [
        { label: "Diâmetro", val: "10 a 12 cm" },
        { label: "Comprimento", val: "2,20m e 2,50m" },
        { label: "Uso", val: "Divisas e Arame Liso" }
      ],
      img: "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop",
      badge: "Extra Forte"
    },
    {
      title: "Mourão Esticador e Canto",
      desc: "Peça de bitola grossa com alta capacidade de suportar forças de tração horizontal nos cantos, portões e curvas sinuosas das cercas.",
      specs: [
        { label: "Diâmetro", val: "12 a 16 cm" },
        { label: "Comprimento", val: "2,50m a 3,00m" },
        { label: "Função", val: "Ancoragem / Esticador" }
      ],
      img: "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=600&auto=format&fit=crop",
      badge: "Estrutural"
    },
    {
      title: "Mourão Pesado para Curral",
      desc: "Madeira roliça extra-reforçada de Citriodora para construção de currais de manejo bovino, embarcadores, cochos e portais de fazendas.",
      specs: [
        { label: "Diâmetro", val: "16 a 20 cm" },
        { label: "Comprimento", val: "2,50m a 3,50m" },
        { label: "Resistência", val: "Carga Bovino Pesada" }
      ],
      img: "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=600&auto=format&fit=crop",
      badge: "Linha Agro"
    }
  ];

  const regionsText = "Entrega ágil de mourões roliços em Estância, Aracaju, Itabaiana, Lagarto, Tobias Barreto, Umbaúba, Cristinápolis, Nossa Senhora do Socorro, Simão Dias e demais regiões do leste sergipano e norte baiano.";

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="bg-primary/20 text-primary border border-primary/30 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              15 Anos de Garantia Autoclave
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight uppercase">
              Mourão de Eucalipto <br /> <span className="text-primary font-extrabold">Tratado</span>
            </h1>
            
            <p className="text-stone-300 text-sm md:text-lg max-w-2xl leading-relaxed font-light">
              Procurando mourões de madeira roliça de alta durabilidade para sua cerca? Nosso eucalipto tratado em autoclave classe UC-4 é imune a cupins e apodrecimento sob o solo. Ideal para fazendas, divisões de pasto e sítios.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#orcamento"
                className="bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Orçar Mourões</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de um orçamento detalhado de mourões de eucalipto tratado com frete.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full shadow transition flex items-center gap-2 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md text-[10px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Mourões Sob Medida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Imunidade Cupins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Preço Direto do Pátio</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-3xl shadow-2xl relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop" 
                alt="Cerca de Fazenda com Mourão de Eucalipto" 
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-103 transition duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <p className="font-bold text-xs text-white uppercase tracking-wider">Mourão em Campo Real</p>
                <p className="text-[10px] text-stone-300 mt-0.5">Cercamento de fazenda sob sol e umidade extrema resistente por décadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES FOR FENCING */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full" id="beneficios">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 dark:border-neutral-800 bg-stone-100 h-96">
              <img 
                src="https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop" 
                alt="Madeira Tratada para Cerca" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Segurança e Economia Rural
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl text-brown-dark dark:text-white uppercase leading-tight">
              A MELHOR MADEIRA PARA FAZENDAS E SÍTIOS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light leading-relaxed">
              Diferente do eucalipto comum ou estacas fracas que apodrecem em menos de 3 anos, o mourão tratado em autoclave da Só Madeiras recebe injeção sob pressão de ativos imunizantes. Isso garante rigidez estrutural mecânica e imunidade química.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-primary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Alinhamento Perfeito</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">Toras selecionadas retas e descascadas mecanicamente para um visual limpo e bonito.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-primary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Livre de Cupim e Brocas</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">O produto químico penetra na zona do alburno da madeira roliça de forma irreversível.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-primary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Resistência sob Tração</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">Suporta o estiramento de arames lisos de alta tensão com catracas sem ceder.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-primary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Opção de Furos e Encaixes</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">Ideal para encaixe de réguas ou passagem de fios de arame sem quebrar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS DISPLAY SECTION */}
      <section id="produtos" className="bg-slate-50 dark:bg-neutral-900/50 py-16 border-y border-stone-250 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Bitolas Disponíveis
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              GRADE COMPLETA DE MOURÕES AUTOCLAVADOS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Escolha o diâmetro e comprimento ideal para a sua cerca ou curral rural.
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
                      href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de fazer uma cotação de *${encodeURIComponent(prod.title)}* para minha fazenda.`}
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

      {/* APPLICATIONS / HOW TO FENCE */}
      <section id="aplicacoes" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Uso em Projetos
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            CERCAMENTOS E ESTRUTURAS APLICADAS
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Entenda como utilizar nossos mourões para obter a cerca mais firme e econômica do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Cercas de Pasto Tradicionais",
              desc: "Divisões de fazenda com mourões padrão de 8 a 10cm espaçados a cada 2,5m e arame farpado de alta tração de aço gerdau.",
              img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Ancoragem de Cantos & Esticadores",
              desc: "Estruturas reforçadas em formato de H com contra-escoras diagonais, travando a força nas cabeceiras e curvas dos arames.",
              img: "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Currais e Divisórias Robustas",
              desc: "Mourões pesados de 16 a 20cm de diâmetro enterrados a 1,0 metro com sapatas de concreto para gado de corte bravo.",
              img: "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=400&auto=format&fit=crop"
            }
          ].map((app, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative select-none">
                <img 
                  src={app.img} 
                  alt={app.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-550"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-bold text-sm md:text-base text-brown-dark dark:text-white group-hover:text-primary transition">
                  {app.title}
                </h4>
                <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed font-light">
                  {app.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="bg-slate-50 dark:bg-neutral-900/50 py-16 border-y border-stone-250 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Mourões no Campo
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              FOTOS REALISTAS DE CERCAMENTOS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Mourões perfeitamente retos instalados sob as mais difíceis condições de clima.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=500&auto=format&fit=crop"
            ].map((url, idx) => (
              <div 
                key={idx} 
                className="h-44 md:h-64 overflow-hidden rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-xs relative group cursor-pointer"
              >
                <img 
                  src={url} 
                  alt={`Mourão Tratado Foto ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
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
            PERGUNTAS SOBRE MOURÕES DE MADEIRA
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Esclareça suas dúvidas técnicas e planeje sua cerca perfeitamente.
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
              Orçamento de Cerca Grátis
            </span>
            
            <h2 className="font-display font-black text-2xl md:text-4xl text-brown-dark dark:text-white uppercase leading-tight">
              PRECISA COTAR A QUANTIDADE DE MOURÕES?
            </h2>
            
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              Diga-nos o comprimento total da sua divisa de terra ou cerca e faremos a cubagem exata de mourões padrão, cantos e esticadores. Garantimos o melhor frete de Sergipe com descarga segura no local!
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Resistência a Incêndios Rurais</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">Embora a madeira queime, o eucalipto denso com imunizante de autoclave retarda as chamas de forma superior comparado à madeira in natura seca.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Força Contra Impacto Animal</h4>
                  <p className="text-[10px] md:text-xs text-stone-800 dark:text-stone-100 font-medium">Ideal para pecuária pesada e confinamentos de búfalos ou touros, mantendo o pasto seguro e inviolável.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3 max-w-md">
              <Truck className="h-6 w-6 text-amber-600 dark:text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-xs text-brown-dark dark:text-white uppercase">Carga Logística Completa</p>
                <p className="text-[10px] text-stone-550 dark:text-stone-400">Entregas de caminhão fechado ou truck fracionado direto do pátio para sua divisa.</p>
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
