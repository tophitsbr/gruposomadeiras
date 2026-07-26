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
  Zap,
  Building
} from "lucide-react";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Postes de Eucalipto Tratado | Redes Elétricas e Obras | Só Madeiras",
  description: "Compre postes de eucalipto tratado em autoclave. Diâmetros robustos para redes de energia, iluminação de sítios, galpões rústicos e fundações. Solicite cotação.",
  alternates: {
    canonical: "https://somadeiras.com.br/postes-de-eucalipto-tratado",
  },
  openGraph: {
    title: "Postes de Eucalipto Tratado | Redes Elétricas e Obras | Só Madeiras",
    description: "Postes e colunas estruturais roliças autoclavadas UC-4. Elevada resistência mecânica para redes de energia rural, iluminação, galpões e fundações.",
    url: "https://somadeiras.com.br/postes-de-eucalipto-tratado",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PostesEucaliptoTratadoPage() {
  const pageTitle = "Postes de Eucalipto Tratado";
  const whatsappNumber = "5579999999999";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/postes-de-eucalipto-tratado/#localbusiness",
        "name": "Só Madeiras - Postes de Eucalipto",
        "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/postes-de-eucalipto-tratado",
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
        "@id": "https://somadeiras.com.br/postes-de-eucalipto-tratado/#breadcrumb",
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
            "name": "Postes de Eucalipto Tratado",
            "item": "https://somadeiras.com.br/postes-de-eucalipto-tratado"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/postes-de-eucalipto-tratado/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual espécie de eucalipto é usada para fabricar postes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fabricamos nossos postes a partir do Eucalipto Citriodora e Eucalipto Cloéziana de florestas de reflorestamento com secagem lenta. Essas espécies possuem as maiores densidades mecânicas de fibras, superando espécies nativas."
            }
          },
          {
            "@type": "Question",
            "name": "Como é feito o travamento/engastamento do poste no solo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O poste deve ser engastado no solo a uma profundidade equivalente a 10% da sua altura total mais 60 centímetros (Fórmula de Engenharia: H/10 + 0,6m). A compactação deve ser feita em camadas alternadas de terra e brita ou concreto."
            }
          },
          {
            "@type": "Question",
            "name": "Os postes possuem furação para fiação?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Os postes podem ser perfurados no local de montagem de acordo com o projeto elétrico ou civil. Como o tratamento em autoclave penetra profundamente, furos pequenos não removem a imunidade contra cupins."
            }
          }
        ]
      }
    ]
  };

  const faqItems = [
    {
      question: "Qual espécie de eucalipto é recomendada para postes estruturais?",
      answer: "Recomendamos e fornecemos postes de Eucalipto Citriodora (alta resiliência mecânica à flexão lateral) e Eucalipto Cloéziana (excelente retilineidade, menor conicidade e fibras muito densas). Ambas as espécies apresentam desempenho estrutural excelente em ensaios laboratoriais comparadas a vigas metálicas ou concreto."
    },
    {
      question: "Como funciona a fórmula técnica de profundidade para enterrar (engastamento)?",
      answer: "A fórmula normativa técnica padrão para engastamento seguro de postes no solo é dada por: Profundidade = (Comprimento do Poste / 10) + 0,60 metros. Por exemplo, um poste de 10 metros de altura deve ser engastado a uma profundidade mínima de 1,60 metros sob o nível do solo."
    },
    {
      question: "Qual a durabilidade de um poste roliço exposto ao sol e chuva?",
      answer: "Nossos postes passam por secagem industrial rigorosa e posterior tratamento em autoclave classe UC-4 (completamente imersos no solo). Isso confere durabilidade garantida superior a 15 anos contra deterioração fúngica, brocas e cupins subterrâneos, com vida útil prática que costuma ultrapassar 30 anos no campo."
    },
    {
      question: "Os postes suportam a tensão de fiação elétrica de alta tensão?",
      answer: "Sim. Nossos postes roliços atendem às rígidas normas das concessionárias de energia elétrica e possuem extraordinária resistência mecânica contra a flexão induzida pela catraca e peso longitudinal da fiação e ventos fortes."
    },
    {
      question: "Como é feita a entrega de toras pesadas de até 12 metros?",
      answer: "A Só Madeiras conta com caminhões trucados equipados com braço hidráulico articulado (Munck) e parceiros de transporte de carga pesada. Descarregamos e entregamos com segurança em fazendas, loteamentos, chácaras e canteiros civis em Sergipe e arredores."
    }
  ];

  const productsList = [
    {
      title: "Poste Padrão de Iluminação",
      desc: "Indicado para suporte de luminárias em chácaras, câmeras de monitoramento patrimonial e fiação de telefonia de baixa tensão.",
      specs: [
        { label: "Diâmetro", val: "10 a 14 cm" },
        { label: "Comprimento", val: "6,00m e 7,00m" },
        { label: "Uso", val: "Iluminação / Câmeras" }
      ],
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
      badge: "Mais Procurado"
    },
    {
      title: "Poste de Rede Elétrica",
      desc: "Coluna roliça reforçada de alta densidade mecânica homologada para instalação de redes de energia primária ou secundária rural.",
      specs: [
        { label: "Diâmetro", val: "14 a 18 cm" },
        { label: "Comprimento", val: "8,00m a 10,00m" },
        { label: "Resistência", val: "Tração Cabos Elétricos" }
      ],
      img: "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop",
      badge: "Homologado"
    },
    {
      title: "Pilar Rústico Pergolado",
      desc: "Toras roliças de retilineidade perfeita e baixíssima conicidade. Ideal para grandes quiosques residenciais, garagens e pergolados nobres.",
      specs: [
        { label: "Diâmetro", val: "12 a 16 cm" },
        { label: "Comprimento", val: "3,00m a 6,00m" },
        { label: "Visual", val: "Aparelhado / Retilíneo" }
      ],
      img: "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=600&auto=format&fit=crop",
      badge: "Arquitetura"
    },
    {
      title: "Poste Extra-Pesado Obras",
      desc: "Bitolas robustas maciças indicadas para fundações profundas de pontes rústicas, contenção de solo e colunas de galpões de pé direito alto.",
      specs: [
        { label: "Diâmetro", val: "18 a 22 cm" },
        { label: "Comprimento", val: "10,00m a 12,00m" },
        { label: "Finalidade", val: "Fundações / Civil Pesada" }
      ],
      img: "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=600&auto=format&fit=crop",
      badge: "Civil / Pesada"
    }
  ];

  const regionsText = "Entrega segura de postes roliços sob autoclave em Estância, Aracaju, Lagarto, Itabaiana, Tobias Barreto, Umbaúba, Cristinápolis, Nossa Senhora do Socorro e todo o estado de Sergipe.";

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="bg-primary/20 text-primary border border-primary/30 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Redes Elétricas & Obras Civis
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight uppercase">
              Postes de Eucalipto <br /> <span className="text-primary font-extrabold">Tratado</span>
            </h1>
            
            <p className="text-stone-300 text-sm md:text-lg max-w-2xl leading-relaxed font-light">
              Madeira roliça de alta resistência mecânica para pilares, redes elétricas e iluminação. Postes selecionados de Citriodora e Cloéziana com imunização química profunda em autoclave classe UC-4 contra pragas do solo.
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
                href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de um orçamento detalhado de postes de eucalipto tratado para minha obra.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full shadow transition flex items-center gap-2 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Atendimento Comercial</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md text-[10px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Postes até 12 Metros</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Normas da ABNT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Entrega com Munck</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-3xl shadow-2xl relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop" 
                alt="Postes de Eucalipto com Rede Elétrica" 
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-103 transition duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <p className="font-bold text-xs text-white uppercase tracking-wider">Postes Elétricos Roliços</p>
                <p className="text-[10px] text-stone-300 mt-0.5">Sustentação confiável de cabos elétricos e isoladores em redes rurais.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL BENEFITS FOR POSTES */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full" id="beneficios">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Capacidade de Carga e Engenharia
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl text-brown-dark dark:text-white uppercase leading-tight">
            RESISTÊNCIA COMPROVADA CONTRA INTEMPÉRIES
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Nossos postes passam por controle rígido de seleção de conicidade e diâmetro, garantindo a carga de trabalho necessária de acordo com as normas da ABNT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Alta Resiliência à Flexão",
              desc: "As toras roliças de Citriodora suportam altas cargas de empuxo lateral provocadas pela fiação elétrica e ventanias sem se romper.",
              icon: Zap,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Perfeita Retilineidade",
              desc: "Processo mecânico e secagem lenta que preserva os postes roliços perfeitamente retos, ideais para colunas estéticas residenciais.",
              icon: TreePine,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Fundações Sem Apodrecimento",
              desc: "Tratamento completo em autoclave classe UC-4 específico para contato permanente do miolo da madeira com o solo encharcado.",
              icon: Building,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Preservante Fixo CCA",
              desc: "O ativo químico é fixado irreversivelmente de forma insolúvel dentro do poste, impedindo qualquer contaminação do solo rural.",
              icon: Shield,
              color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            },
            {
              title: "Normatizado ABNT NBR 8451",
              desc: "Atendimento técnico a todas as exigências das principais concessionárias estaduais de distribuição de energia elétrica.",
              icon: Award,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Economia Real nas Obras",
              desc: "Postes e colunas de eucalipto roliço custam até 60% menos do que estruturas fabricadas em concreto armado ou ferro estrutural.",
              icon: Sparkles,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex items-start gap-4"
              >
                <div className={`p-3.5 rounded-2xl flex-shrink-0 transition-colors group-hover:bg-primary/20 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm md:text-base text-brown-dark dark:text-white group-hover:text-primary transition">
                    {item.title}
                  </h4>
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
              Nossa Grade de Postes
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              COMPRIMENTOS E BITOLAS DISPONÍVEIS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Escolha a espessura e comprimento correto de acordo com a finalidade da sua obra civil ou rural.
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
                      href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de cotar o poste *${encodeURIComponent(prod.title)}* para entrega em Sergipe.`}
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

      {/* APPLICATIONS / HOW TO USE POSTES */}
      <section id="aplicacoes" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Uso em Projetos
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            POSTES ROLIÇOS DE GRANDE CAPACIDADE
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Veja as principais montagens estruturais civis e rurais com nossos postes de eucalipto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fiação e Iluminação Rural",
              desc: "Postes de rede elétrica e energia para sítios, fazendas, haras, além de chumbamento lateral de refletores de iluminação.",
              img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Estruturas de Galpões Rústicos",
              desc: "Colunas de pé direito de grande altura, tesouras rústicas e terças roliças de apoio ideais para depósitos agrícolas e aviários.",
              img: "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Fundações e Pontes",
              desc: "Estacas de fundação subterrânea resistentes à umidade do lençol freático, úteis para barragens, pontes e ancoragem de encostas.",
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
              Postes em Ação
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              GALERIA DE POSTES E COLUNAS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Tratamento a vácuo-pressão que garante robustez mecânica sob qualquer intempérie.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=500&auto=format&fit=crop",
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
                  alt={`Poste Tratado Foto ${idx + 1}`} 
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
            DÚVIDAS TÉCNICAS SOBRE POSTES
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Esclareça suas dúvidas sobre resistência mecânica, cubagem e normas elétricas.
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
              Orçamento de Postes Grátis
            </span>
            
            <h2 className="font-display font-black text-2xl md:text-4xl text-brown-dark dark:text-white uppercase leading-tight">
              PRECISA DE COTAÇÃO DE POSTES ROLIÇOS?
            </h2>
            
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              Preencha o formulário e faça seu orçamento formal de postes roliços sob autoclave classe UC-4. Oferecemos descarga com guindaste Munck e faturamento direto com preços de tabela!
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Homologado e Seguro</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Postes em estrita conformidade com as normas ABNT e concessionárias para segurança total na passagem de linhas de energia viva.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Fundações e Drenagem</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Suporta o soterramento permanente no solo sem perder a rigidez mecânica por décadas.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3 max-w-md">
              <Truck className="h-6 w-6 text-amber-600 dark:text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-xs text-brown-dark dark:text-white uppercase">Descarga com Caminhão Munck</p>
                <p className="text-[10px] text-stone-550 dark:text-stone-400">Nossa equipe conta com maquinário apropriado para descarregar postes de grande porte com segurança total.</p>
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
