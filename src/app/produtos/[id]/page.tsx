import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ProductDetailClient from "./ProductDetailClient";

// Existing database definition mapped for dynamic pages
const INITIAL_PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto Tramontina 500W", category: "ferramentas", brand: "Tramontina", price: 289.90, stock: 14, rating: 4.8, desc: "Mandril de 1/2 polegada, velocidade variável e reversível com empunhadura ergonômica.", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Tubo de Esgoto Tigre 100mm 6m", category: "hidraulico", brand: "Tigre", price: 119.90, stock: 42, rating: 4.9, desc: "Tubo de PVC rígido marrom para condução segura de efluentes domésticos com anel de vedação.", img: "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Cabo Flexível Sil 2.5mm² 100m", category: "eletrico", brand: "Fame", price: 189.90, stock: 25, rating: 4.7, desc: "Cabo de cobre antichama isolado em PVC resistente de 750V para instalações gerais.", img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Viga de Cambará Aparelhada 5x15cm 3m", category: "madeiras", brand: "Só Madeiras", price: 145.00, stock: 80, rating: 4.9, desc: "Madeira nobre de cambará tratada em estufa, aparelhada e desempenada de alta durabilidade.", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Banco de Jardim em Madeira Maciça", category: "moveis", brand: "Só Madeiras", price: 599.00, stock: 8, rating: 4.6, desc: "Tratamento náutico completo contra sol e chuva, ideal para 3 lugares confortáveis.", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Fechadura Colonial Premium Pado", category: "ferragens", brand: "Tramontina", price: 159.90, stock: 19, rating: 4.7, desc: "Acabamento bronze latonado oxidado de alta resistência mecânica para portas externas.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Tinta Acrílica Suvinil Fosca 18L", category: "tintas", brand: "Suvinil", price: 389.00, stock: 30, rating: 4.8, desc: "Excelente cobertura, lavável e sem cheiro em até 3 horas de secagem rápida.", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Telha Ecológica Onduline 200x95cm", category: "telhas", brand: "Onduline", price: 79.90, stock: 150, rating: 4.5, desc: "Telha termoacústica leve de alta durabilidade, feita de fibras vegetais impermeabilizadas.", img: "/images/tiles/telha_onduline.png", coverage: 1.5, weight: 6.4, tileType: "onduline" },
  { id: 9, name: "Aparador de Grama Tramontina 1000W", category: "jardinagem", brand: "Tramontina", price: 249.00, stock: 12, rating: 4.7, desc: "Fio de nylon automático com empunhadura ergonômica regulável para jardinagem segura.", img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80" },
  { id: 10, name: "Cimento CP-II Votoran 50kg", category: "pesada", brand: "Votorantim", price: 34.90, stock: 500, rating: 4.9, desc: "Cimento composto com pozolana, excelente trabalhabilidade e secagem rápida para estruturas.", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Prancha de Ipê Aparelhada 4x20cm 4m", category: "madeiras", brand: "Só Madeiras", price: 320.00, stock: 45, rating: 5.0, desc: "Prancha de altíssima hardness e durabilidade natural. Perfeita para decks e pergolados de luxo.", img: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=600&q=80" },
  { id: 12, name: "Mesa de Jantar Rustica 8 Cadeiras", category: "moveis", brand: "Só Madeiras", price: 2490.00, stock: 3, rating: 4.9, desc: "Fabricada em madeira de demolição autêntica peroba rosa com acabamento premium em cera.", img: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80" },
  { id: 13, name: "Porta Pivotante Angelim Maciça 2.10x1.00m", category: "madeiras", brand: "Só Madeiras", price: 1890.00, stock: 5, rating: 5.0, desc: "Acompanha pino pivotante de inox e fechadura rolete de alta segurança e estabilidade.", img: "/images/doors/porta_pivotante_angelim.png", woodType: "angelim", grooves: false, handle: "pivot" },
  { id: 14, name: "Porta Maciça Frisada Tauari 2.10x0.80m", category: "madeiras", brand: "Só Madeiras", price: 789.90, stock: 12, rating: 4.8, desc: "Madeira nobre de reflorestamento com secagem técnica em estufa e frisos decorativos.", img: "/images/doors/porta_frisada_tauari.png", woodType: "tauari", grooves: true, handle: "standard" },
  { id: 15, name: "Porta de Madeira Colmeia 70x210 cm HDF - Madelar", category: "madeiras", brand: "Madelar", price: 199.00, stock: 35, rating: 4.7, desc: "Capa em HDF de alta densidade com enchimento acústico leve em colmeia Madelar.", img: "/images/doors/porta_colmeia_madelar.png", woodType: "eucalipto", grooves: false, handle: "standard" },
  { id: 16, name: "Kit Porta Pronta Completo com Batente e Fechadura", category: "madeiras", brand: "Só Madeiras", price: 649.00, stock: 8, rating: 4.9, desc: "Acompanha batente (portal), alizar (guarnição), dobradiças de inox e fechadura instaladas.", img: "/images/doors/kit_porta_pronta.png", woodType: "tauari", grooves: true, handle: "kit", frame: true },
  { id: 17, name: "Telha Cerâmica Portuguesa Natural", category: "telhas", brand: "Só Madeiras", price: 2.99, stock: 4500, rating: 4.8, desc: "Telha cerâmica vermelha tradicional portuguesa, excelente isolamento e encaixe perfeito.", img: "/images/tiles/telha_portuguesa.png", coverage: 17.0, weight: 2.8, tileType: "ceramic" },
  { id: 18, name: "Telha de Concreto Plana Grafite", category: "telhas", brand: "Tegula", price: 8.50, stock: 1800, rating: 4.9, desc: "Telha de concreto de alta resistência, design moderno plano na cor cinza grafite.", img: "/images/tiles/telha_concreto.png", coverage: 10.4, weight: 4.8, tileType: "concrete" },
  { id: 19, name: "Telha Esmaltada Americana Premium", category: "telhas", brand: "Só Madeiras", price: 4.20, stock: 2500, rating: 4.7, desc: "Telha esmaltada dupla-face americana, altíssimo brilho, impermeável a fungos.", img: "/images/tiles/telha_esmaltada.png", coverage: 12.0, weight: 3.1, tileType: "glazed" }
];

// Dynamic metadata generation (Server-Side)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);
  const foundProduct = INITIAL_PRODUCTS.find(p => p.id === productId);

  if (!foundProduct) {
    return {
      title: "Produto Não Encontrado | Só Madeiras",
      description: "O produto buscado não existe em nosso catálogo de materiais."
    };
  }

  return {
    title: `${foundProduct.name} | Só Madeiras`,
    description: `${foundProduct.desc} Marca: ${foundProduct.brand}. Compre pelo menor preço com desconto no Pix e entrega imediata.`,
    alternates: {
      canonical: `https://somadeiras.com.br/produtos/${productId}`
    },
    openGraph: {
      title: `${foundProduct.name} | Só Madeiras`,
      description: foundProduct.desc,
      url: `https://somadeiras.com.br/produtos/${productId}`,
      type: "website",
      locale: "pt_BR",
    }
  };
}

// Server-side page entry point
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  const foundProduct = INITIAL_PRODUCTS.find(p => p.id === productId);

  if (!foundProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 dark:text-slate-100">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Produto não encontrado</h2>
          <Link href="/" className="bg-[#3E2723] text-white px-6 py-2.5 rounded-full font-bold">
            Voltar para o catálogo
          </Link>
        </div>
      </div>
    );
  }

  const specsData = getSpecsData(foundProduct.id, foundProduct.brand, foundProduct.category);

  // Generate dynamic JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": foundProduct.name,
    "image": foundProduct.img.startsWith("http") || foundProduct.img.startsWith("/") 
      ? `https://somadeiras.com.br${foundProduct.img}`
      : "https://somadeiras.com.br/images/wood-placeholder.png",
    "description": foundProduct.desc,
    "brand": {
      "@type": "Brand",
      "name": foundProduct.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://somadeiras.com.br/produtos/${foundProduct.id}`,
      "priceCurrency": "BRL",
      "price": foundProduct.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": foundProduct.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": foundProduct.rating.toString(),
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient initialProduct={foundProduct} specsData={specsData} />
    </>
  );
}

// Technical spec sheet generator
function getSpecsData(id: number, brand: string, category: string): Array<{ label: string, value: string }> {
  const common = [
    { label: "Fabricante", value: brand },
    { label: "Garantia Oficial", value: "12 meses" },
    { label: "DOF Florestal", value: "Isento / Não aplicável" },
    { label: "Certificação ABNT", value: "Sim, Produto Homologado" }
  ];

  if (category === "madeiras") {
    return [
      { label: "Espécie de Madeira", value: id === 13 ? "Angelim Vermelho" : id === 14 ? "Tauari Premium" : "Cambará da Amazônia" },
      { label: "Processamento Técnica", value: "Seca em Estufa (Moisture 12%)" },
      { label: "Acabamento da Superfície", value: "Aparelhada e Lixada (Pronta para Verniz)" },
      { label: "Densidade Média", value: "Aproximadamente 780 kg/m³" },
      { label: "DOF Ibama", value: "Emitido automaticamente com a Nota Fiscal" },
      { label: "Garantia Contra Pragas", value: "5 anos de imunização química UC-3" }
    ];
  }

  if (category === "telhas") {
    return [
      { label: "Material da Telha", value: id === 8 ? "Fibras Vegetais Impermeabilizadas" : id === 17 ? "Argila Vermelha Cozida" : "Concreto de Alto Desempenho" },
      { label: "Peso Unitário", value: id === 8 ? "6.4 kg" : id === 17 ? "2.8 kg" : "4.8 kg" },
      { label: "Rendimento por m²", value: id === 8 ? "1.5 telhas" : id === 17 ? "17.0 telhas" : "10.4 telhas" },
      { label: "Absorção de Água", value: "< 8% (Estabilidade dimensional perfeita)" },
      { label: "Inclinação Recomendada", value: "30% a 35%" }
    ];
  }

  if (category === "ferramentas") {
    return [
      { label: "Potência Elétrica", value: "500W / 1000W" },
      { label: "Mandril de Fixação", value: "1/2 polegada (13mm)" },
      { label: "Velocidade de Rotação", value: "0 a 2900 RPM com Gatilho Reversível" },
      { label: "Funções Integradas", value: "Impacto / Perfuração simples" },
      { label: "Tensão de Operação", value: "127V / 220V Selecionável" }
    ];
  }

  if (category === "tintas") {
    return [
      { label: "Volume Nominal", value: "18 Litros" },
      { label: "Rendimento por Lata", value: "Até 150m² acabados por demão" },
      { label: "Acabamento Pintura", value: "Fosco Aveludado" },
      { label: "Número de Demãos", value: "Recomendado 2 a 3 demãos" },
      { label: "Secagem Completa", value: "12 horas (Ao toque em 2 horas)" }
    ];
  }

  return common;
}
