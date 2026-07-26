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
  HelpCircle,
  Truck,
  Leaf,
  Check
} from "lucide-react";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Eucalipto Tratado em Estância-SE | Mourões, Postes e Estacas | Só Madeiras",
  description: "Compre eucalipto tratado em Estância-SE. Mourões, postes, estacas e madeira tratada para cercas, fazendas e construções rurais. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/eucalipto-tratado-estancia-se",
  },
  openGraph: {
    title: "Eucalipto Tratado em Estância-SE | Mourões, Postes e Estacas | Só Madeiras",
    description: "Fornecimento regional de Eucalipto Tratado de alta durabilidade em autoclave contra cupins e umidade. Solicite orçamento formal com frete para Sergipe.",
    url: "https://somadeiras.com.br/eucalipto-tratado-estancia-se",
    type: "website",
    locale: "pt_BR",
  }
};

export default function EucaliptoTratadoEstanciaPage() {
  const pageTitle = "Eucalipto Tratado em Estância-SE";
  const whatsappNumber = "5579999999999"; // Local Sergipe representative

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/eucalipto-tratado-estancia-se/#localbusiness",
        "name": "Só Madeiras - Eucalipto Tratado Sergipe",
        "image": "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/eucalipto-tratado-estancia-se",
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
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "07:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/eucalipto-tratado-estancia-se/#breadcrumb",
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
            "name": "Eucalipto Tratado em Estância-SE",
            "item": "https://somadeiras.com.br/eucalipto-tratado-estancia-se"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/eucalipto-tratado-estancia-se/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual é a garantia do eucalipto tratado da Só Madeiras?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nosso eucalipto tratado em autoclave possui garantia de até 15 anos contra o ataque de cupins, fungos de apodrecimento e umidade do solo, pois recebe tratamento completo na classe de retenção UC-4."
            }
          },
          {
            "@type": "Question",
            "name": "Vocês entregam em todo o estado de Sergipe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, possuímos frota própria de caminhões pesados e parcerias logísticas para entregar com rapidez e menor custo de frete em Estância, Aracaju, Itabaiana, Lagarto, Tobias Barreto e demais municípios sergipanos."
            }
          },
          {
            "@type": "Question",
            "name": "Qual espécie de eucalipto é utilizada nos mourões e postes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Utilizamos principalmente o Eucalipto Citriodora e Eucalipto Cloéziana, reconhecidos nacionalmente pela altíssima resistência mecânica, fibras densas e excelente absorção do imunizante em autoclave."
            }
          }
        ]
      }
    ]
  };

  const faqItems = [
    {
      question: "O que é o tratamento em autoclave (vácuo-pressão)?",
      answer: "É um processo industrial onde a madeira limpa e seca é inserida em um cilindro de alta pressão. Inicialmente, aplica-se vácuo para extrair o ar e umidade das células da madeira. Em seguida, injeta-se o preservativo químico (geralmente CCA) sob alta pressão, saturando as fibras da madeira e tornando-a imune a agentes biológicos."
    },
    {
      question: "Qual a diferença de durabilidade entre madeira tratada e eucalipto comum?",
      answer: "O eucalipto in natura ou sem tratamento exposto ao tempo, umidade do solo e sol costuma durar de 2 a 5 anos antes de apodrecer ou ser consumido por cupins. O eucalipto tratado em autoclave da Só Madeiras tem durabilidade comprovada superior a 15 a 20 anos, mantendo a integridade estrutural intacta."
    },
    {
      question: "O que significa a classe de tratamento UC-4?",
      answer: "A categoria de Uso UC-4 (de acordo com a NBR 16143) designa madeiras tratadas especificamente para contato permanente com o solo, água doce ou umidade extrema, como mourões de cerca enterrados, estacas de fundação, postes de transmissão e arrimos de terra."
    },
    {
      question: "Quais diâmetros de mourões e postes estão disponíveis?",
      answer: "Trabalhamos com uma ampla grade comercial. Desde estacas finas para tutoramento agrícola (diâmetro de 6 a 8cm), mourões padrão para cercas de fazenda (8-10cm, 10-12cm e 12-14cm com 2,20m de comprimento), até peças estruturais pesadas e postes com diâmetros de até 22cm e comprimentos de até 12 metros."
    },
    {
      question: "Como solicitar uma cotação formal com frete incluso?",
      answer: "Basta rolar até o nosso formulário no final desta página, preencher seus dados de contato e cidade de entrega. Nosso time de cubagem calculará a quantidade exata de toras para sua cerca ou cobertura e cotará a melhor opção de frete direto do nosso pátio em Sergipe!"
    }
  ];

  const productsList = [
    {
      title: "Mourão de Eucalipto Tratado",
      desc: "Perfeito para cercas de fazenda, demarcações de terras e cercados rurais. Alta densidade mecânica que suporta a tração dos arames sem rachar.",
      specs: [
        { label: "Diâmetro", val: "08 a 14 cm" },
        { label: "Comprimento", val: "2,20m e 2,50m" },
        { label: "Durabilidade", val: "Classe UC-4 (+15 Anos)" }
      ],
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
      badge: "Mais Vendido"
    },
    {
      title: "Poste de Eucalipto Autoclavado",
      desc: "Coluna robusta indicada para redes elétricas internas de chácaras, iluminação pública, fundações profundas e pilares estruturais pesados.",
      specs: [
        { label: "Diâmetro", val: "14 a 22 cm" },
        { label: "Comprimento", val: "6,00m a 12,00m" },
        { label: "Resistência", val: "Alta Carga Mecânica" }
      ],
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
      badge: "Estrutural"
    },
    {
      title: "Estaca de Eucalipto Tratada",
      desc: "Hastes roliças ideais para tutoramento de lavouras (tomate, uva), fixação de plantas em paisagismo e pequenas contenções de encostas.",
      specs: [
        { label: "Diâmetro", val: "05 a 08 cm" },
        { label: "Comprimento", val: "1,50m a 2,20m" },
        { label: "Tratamento", val: "Autoclave CCA" }
      ],
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=600&auto=format&fit=crop",
      badge: "Agrícola"
    },
    {
      title: "Viga e Caibro Roliço",
      desc: "Madeiras roliças descascadas e perfeitamente retas para construção de pergolados rústicos, quiosques, garagens e coberturas de galpão.",
      specs: [
        { label: "Diâmetro", val: "10 a 16 cm" },
        { label: "Comprimento", val: "3,00m a 6,00m" },
        { label: "Visual", val: "Rústico Premium" }
      ],
      img: "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=600&auto=format&fit=crop",
      badge: "Arquitetura"
    }
  ];

  const regionsText = "Atendemos com frota própria e entrega imediata em Estância, Aracaju, Lagarto, Itabaiana, Nossa Senhora do Socorro, Umbaúba, Indiaroba, Santa Luzia do Itanhy, Cristinápolis, Tomar do Geru, Barra dos Coqueiros e todo o território de Sergipe.";

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="bg-primary/20 text-primary border border-primary/30 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Fornecedor Regional Sergipe
            </span>
            
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight uppercase">
              Eucalipto Tratado <br /> em <span className="text-primary">Estância-SE</span>
            </h1>
            
            <p className="text-stone-300 text-sm md:text-lg max-w-2xl leading-relaxed font-light">
              Mourões de cerca de fazenda, postes de alta carga, estacas agrícolas e vigas roliças selecionadas. Proteção total contra cupins e intempéries com tratamento em autoclave a vácuo-pressão (15 Anos de Garantia).
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
                href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de um orçamento imediato de Eucalipto Tratado para entrega em Sergipe.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full shadow transition flex items-center gap-2 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Atendimento WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md text-[10px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Madeira Imune UC-4</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Garantia de 15 Anos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Entrega Rápida SE</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-3xl shadow-2xl relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=600&auto=format&fit=crop" 
                alt="Estoque Real Eucalipto Tratado" 
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-103 transition duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <p className="font-bold text-xs text-white uppercase tracking-wider">Estoque sob Autoclave</p>
                <p className="text-[10px] text-stone-300 mt-0.5">Toras perfeitamente secas prontas para imunização química.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="beneficios" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Por que Escolher Madeira Autoclavada?
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            VANTAGENS EXCLUSIVAS DO NOSSO EUCALIPTO
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            O tratamento químico a vácuo-pressão modifica fisicamente a madeira de reflorestamento, tornando-a tão resistente ou superior às espécies de lei nativas da Amazônia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Imunidade Total a Pragas",
              desc: "100% resistente ao cupim subterrâneo, brocas e fungos apodrecedores. A madeira não enfraquece ao longo do tempo.",
              icon: Shield,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Altíssima Durabilidade Rústica",
              desc: "Projetado para resistir a mais de 15 anos exposto à umidade direta da terra, sol forte de Sergipe e chuvas torrenciais.",
              icon: Award,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Eco-Sustentável (DOF)",
              desc: "Madeira originada 100% de florestas plantadas de reflorestamento, ajudando a conter a devastação de árvores nativas.",
              icon: Leaf,
              color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            },
            {
              title: "Custo-Benefício Imbatível",
              desc: "Custa consideravelmente menos que vigas de concreto ou madeiras nobres de lei, com a mesma vida útil em cercas.",
              icon: Sparkles,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Firmeza Estrutural Reta",
              desc: "Toras selecionadas retas de Eucalipto Cloéziana e Citriodora com baixíssima conicidade e alta densidade de fibras.",
              icon: TreePine,
              color: "text-amber-600 dark:text-primary bg-amber-500/10"
            },
            {
              title: "Facilidade de Instalação",
              desc: "Permite furações, parafusamentos, fixações e cortes mecânicos de forma rápida no canteiro de obras rurais.",
              icon: Wrench,
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
              Nosso Portfólio Comercial
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              PRODUTOS SELECIONADOS DA SÓ MADEIRAS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Madeiras roliças descascadas e imunizadas em autoclave nas bitolas corretas para sua obra rural ou civil.
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
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal line-clamp-3 font-light">
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
                      href={`https://wa.me/${whatsappNumber}?text=Olá Só Madeiras! Gostaria de cotar o produto *${encodeURIComponent(prod.title)}* para entrega em Sergipe.`}
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

      {/* APPLICATIONS SECTION */}
      <section id="aplicacoes" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Múltiplas Utilidades Rústicas
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            ONDE APLICAR O EUCALIPTO TRATADO?
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Da fundação subterrânea ao acabamento estético em residências de alto padrão. Descubra os principais usos da madeira roliça autoclavada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Cercamentos Rurais",
              desc: "Construção de cercas de arame farpado ou liso com mourões e estacas esticadoras de alta tração e durabilidade mecânica.",
              img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Pergolados e Decks",
              desc: "Estruturas de lazer requintadas, coberturas rústicas, caramanchões e colunas de sustentação para varandas de lazer.",
              img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Currais e Galpões",
              desc: "Estruturas pesadas para contenção de gado de corte/leite, cochos de alimentação e pilares estruturais para galpões de maquinário.",
              img: "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Paisagismo e Jardinagem",
              desc: "Estacas de fixação para plantas, dormentes de contorno para caminhos, pontes rústicas e playgrounds de madeira.",
              img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&auto=format&fit=crop"
            }
          ].map((app, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative select-none">
                <img 
                  src={app.img} 
                  alt={app.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-550"
                />
              </div>
              <div className="p-5 space-y-2">
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

      {/* PHOTO GALLERY SECTION */}
      <section id="galeria" className="bg-slate-50 dark:bg-neutral-900/50 py-16 border-y border-stone-250 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Estoque Real & Projetos
            </span>
            <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
              GALERIA DE FOTOS SÓ MADEIRAS
            </h2>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
              Confira fotos de nossas toras estufadas, entregas em fazendas parceiras e estruturas finalizadas por nossos carpinteiros.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1546482503-93453322660b?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517089596392-db9a5e2f22c6?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=500&auto=format&fit=crop"
            ].map((url, idx) => (
              <div 
                key={idx} 
                className="h-44 md:h-64 overflow-hidden rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-xs relative group cursor-pointer"
              >
                <img 
                  src={url} 
                  alt={`Eucalipto Tratado Foto ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">🔍 Ampliar Foto</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 px-4 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Central de Ajuda
          </span>
          <h2 className="font-display font-black text-2xl md:text-3.5xl tracking-tight text-brown-dark dark:text-white uppercase leading-snug">
            DÚVIDAS FREQUENTES (FAQ)
          </h2>
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light">
            Confira as principais perguntas de fazendeiros e construtores de Sergipe antes de comprar eucalipto tratado.
          </p>
        </div>

        <SeoFAQ items={faqItems} />
      </section>

      {/* FINAL CTA & LEAD CAPTURE FORM SECTION */}
      <section id="orcamento" className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 py-16 px-4 border-t border-stone-250 dark:border-dark-border relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-5 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-600 rounded-full filter blur-3xl opacity-5 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/20 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Orçamento de Pátio Imediato
            </span>
            
            <h2 className="font-display font-black text-2xl md:text-4xl text-brown-dark dark:text-white uppercase leading-tight">
              PRONTO PARA INICIAR SEU ORÇAMENTO?
            </h2>
            
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              Nossa equipe técnica comercial está pronta para ajudá-lo com a cubagem exata do seu projeto. Seja para cercar uma pequena chácara ou fornecer postes pesados para rede elétrica em grandes plantações rurais em Sergipe.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Faturamento Facilitado</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Opções de faturamento em boleto corporativo, Pix com 10% de desconto e cartão de crédito.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 dark:text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-white">Entrega Agendada Sergipe</h4>
                  <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400">Frota própria e transportadoras qualificadas para descarregar sua madeira com segurança no seu pátio ou fazenda.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3 max-w-md">
              <Truck className="h-6 w-6 text-amber-600 dark:text-primary flex-shrink-0 animate-bounce" />
              <div>
                <p className="font-bold text-xs text-brown-dark dark:text-white uppercase">Frete sob Medida</p>
                <p className="text-[10px] text-stone-550 dark:text-stone-400">Buscamos o menor custo de logística do pátio direto para o seu endereço em Estância-SE e arredores.</p>
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
