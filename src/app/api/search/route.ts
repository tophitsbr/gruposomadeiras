import { NextResponse } from "next/server";

// Helper function to fetch images from Bing Images
async function fetchImagesFromBing(searchQuery: string): Promise<string[]> {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&qft=+filterui:photo-transparent&form=IRFLTR&first=1`;
  const images: string[] = [];

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.bing.com/"
      },
      cache: "no-store"
    });

    if (res.ok) {
      const html = await res.text();
      const mRegex = /m="([^"]+)"/g;
      let match;
      while ((match = mRegex.exec(html)) !== null) {
        try {
          const cleanedStr = match[1].replace(/&quot;/g, '"');
          const mData = JSON.parse(cleanedStr);
          if (mData.murl && mData.murl.startsWith("http")) {
            images.push(mData.murl);
          }
        } catch (e) {}
      }
    }
  } catch (err) {
    console.error(`Bing images error for "${searchQuery}":`, err);
  }

  return images;
}

// Helper function to fetch images from Google Images (backup)
async function fetchImagesFromGoogle(searchQuery: string): Promise<string[]> {
  const googleUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`;
  let finalUrls: string[] = [];

  try {
    const res = await fetch(googleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://www.google.com/",
        "Cookie": "CONSENT=YES+; SOCS=CAESEwgDEgk...",
      },
      cache: "no-store"
    });

    if (res.ok) {
      const html = await res.text();
      const urls: string[] = [];
      const regex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const url = match[1];
        if (url.startsWith("http") && !url.includes("googlelogo") && !url.includes("gif")) {
          urls.push(url);
        }
      }
      const highResRegex = /"https?:\/\/[^"]+\.(?:png|jpg|jpeg|webp)"/gi;
      const matches = html.match(highResRegex) || [];
      const directUrls = matches
        .map((m: string) => m.replace(/"/g, ""))
        .filter((u: string) => !u.includes("gstatic.com") && !u.includes("google.com"));
      finalUrls = [...new Set([...directUrls, ...urls])];
    }
  } catch (err) {
    console.error(`Google images error for "${searchQuery}":`, err);
  }

  return finalUrls;
}



// ============================================================
// 🤖 PRODUCT DESCRIPTION ROBOT
// Strategy:
//   1. Search Bing for the product name restricted to known
//      Brazilian hardware/construction e-commerce domains.
//   2. Extract the first product page URL from the results.
//   3. Fetch that product page and extract:
//      a) JSON-LD Schema.org "description" (most reliable)
//      b) <meta property="og:description"> (very common)
//      c) <meta name="description"> (universal fallback)
//   If all fail, returns empty string so the smart generator kicks in.
// ============================================================

const TRUSTED_STORES = [
  "leroymerlin.com.br",
  "telhanorte.com.br",
  "casaeconstrucao.com.br",
  "queroferro.com.br",
  "madeirasa.com.br",
  "brasilfenix.com.br",
  "lojadoconstrutor.com.br",
  "materiaisdeconstrucao.net",
  "sodimac.com.br",
  "bricostore.com.br",
  "portobello.com.br",
  "ferreiracosta.com",
  "multiplaconstrucao.com.br",
];

async function scrapeProductDescription(productName: string): Promise<string> {
  // Simpler Bing query: search normally and pick the first result from a trusted store
  const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(productName + " material construção ficha técnica")}&setlang=pt-BR&count=5`;

  let productPageUrl = "";

  try {
    const searchRes = await fetch(bingSearchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Referer": "https://www.bing.com/",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (searchRes.ok) {
      const html = await searchRes.text();
      // Look for any href from a trusted store domain
      const linkRegex = /href="(https?:\/\/(?:www\.)?(?:leroymerlin|telhanorte|casaeconstrucao|queroferro|madeirasa|brasilfenix|lojadoconstrutor|materiaisdeconstrucao|sodimac|bricostore|portobello|ferreiracosta|multiplaconstrucao|dicico|tramontina|votorantim|tigre\.com)[^"\s]{5,200})"/gi;
      const match = linkRegex.exec(html);
      if (match) {
        productPageUrl = match[1];
      }
    }
  } catch (err) {
    console.error("[DescBot] Bing search error:", err);
    return "";
  }

  if (!productPageUrl) {
    console.log(`[DescBot] No store URL found for "${productName}"`);
    return "";
  }

  try {
    console.log(`[DescBot] Fetching: ${productPageUrl}`);
    const pageRes = await fetch(productPageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept": "text/html",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });

    if (!pageRes.ok) return "";
    const pageHtml = await pageRes.text();

    // Priority 1: JSON-LD Schema.org Product
    const jsonLdRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let ldMatch;
    while ((ldMatch = jsonLdRegex.exec(pageHtml)) !== null) {
      try {
        const parsed = JSON.parse(ldMatch[1]);
        const items = Array.isArray(parsed) ? parsed : parsed["@graph"] ? parsed["@graph"] : [parsed];
        for (const item of items) {
          if ((item["@type"] === "Product" || String(item["@type"]).includes("Product")) && item.description) {
            const desc = String(item.description).replace(/<[^>]+>/g, "").trim();
            if (desc.length > 20) { console.log(`[DescBot] ✅ JSON-LD`); return desc.length > 350 ? desc.slice(0, 347) + "..." : desc; }
          }
        }
      } catch (e) {}
    }

    // Priority 2: og:description
    const ogMatch = pageHtml.match(/<meta[^>]+property="og:description"[^>]+content="([^"]{20,400})"/i)
      || pageHtml.match(/<meta[^>]+content="([^"]{20,400})"[^>]+property="og:description"/i);
    if (ogMatch) {
      const desc = ogMatch[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
      if (desc.length > 20) { console.log(`[DescBot] ✅ og:description`); return desc.length > 350 ? desc.slice(0, 347) + "..." : desc; }
    }

    // Priority 3: meta description
    const metaMatch = pageHtml.match(/<meta[^>]+name="description"[^>]+content="([^"]{20,400})"/i)
      || pageHtml.match(/<meta[^>]+content="([^"]{20,400})"[^>]+name="description"/i);
    if (metaMatch) {
      const desc = metaMatch[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
      if (desc.length > 20) { console.log(`[DescBot] ✅ meta desc`); return desc.length > 350 ? desc.slice(0, 347) + "..." : desc; }
    }

  } catch (err) {
    console.error(`[DescBot] Page error:`, err);
  }

  return "";
}


// Generate a smart contextual description based on product name and detected category
function generateSmartDescription(productName: string): string {
  const name = productName.toLowerCase();

  // --- CIMENTO ---
  if (name.includes("cimento")) {
    const kg = name.match(/(\d+)\s*kg/)?.[1];
    const marca = name.includes("poty") ? "Cimento Poty" : name.includes("votoran") ? "Votoran" : name.includes("cauê") ? "Cauê" : "Cimento CP-II";
    return `${marca}${kg ? ` ${kg}kg` : ""} ideal para construção de alvenaria, reboco, contra-piso e estruturas em geral. Alta resistência mecânica, baixo calor de hidratação e excelente trabalhabilidade. Indicado para obras residenciais e comerciais.`;
  }

  // --- TELHA ---
  if (name.includes("telha")) {
    const comp = name.match(/(\d[\d,.]+)\s*(?:m|mt)/)?.[1];
    const mat = name.includes("fibrocimento") ? "Fibrocimento" : name.includes("colonial") ? "Colonial Cerâmica" : name.includes("portuguesa") ? "Portuguesa Cerâmica" : name.includes("pvc") ? "PVC" : "Metálica";
    return `Telha ${mat}${comp ? ` de ${comp}m` : ""} com alta durabilidade e resistência às intempéries. Ótimo desempenho térmico e acústico. Indicada para coberturas de residências, galpões e instalações rurais. Fácil instalação e baixa manutenção.`;
  }

  // --- MADEIRA / VIGA / CAIBRO / RIPA ---
  if (name.includes("viga") || name.includes("caibro") || name.includes("ripa") || name.includes("sarrafo") || name.includes("pontalete")) {
    const dim = name.match(/(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?)/)?.[1] || "";
    const comp = name.match(/(\d[\d,.]+)\s*m/)?.[1];
    const tipo = name.includes("eucalipto") ? "Eucalipto" : name.includes("pinus") ? "Pinus" : name.includes("angelim") ? "Angelim" : "Pinus/Eucalipto";
    const piece = name.includes("viga") ? "Viga" : name.includes("caibro") ? "Caibro" : name.includes("ripa") ? "Ripa" : name.includes("sarrafo") ? "Sarrafo" : "Pontalete";
    return `${piece} de ${tipo}${dim ? ` ${dim}` : ""}${comp ? ` com ${comp}m de comprimento` : ""}, seca em estufa com umidade controlada. Ideal para estrutura de telhado, pergolado, deck e construções rurais. Resistente ao apodrecimento e ataques de insetos. Madeira reflorestada certificada.`;
  }

  // --- MOURÃO / POSTE ---
  if (name.includes("mourão") || name.includes("mourao") || name.includes("poste")) {
    return `Mourão de Eucalipto Citriodora tratado em autoclave com CCA (arseniato de cobre cromatado) para máxima durabilidade no solo. Resistente a cupins, fungos e intempéries por até 25 anos. Ideal para cercas rurais, pastagens e divisas de propriedades.`;
  }

  // --- FORRO PVC / FORRO ---
  if (name.includes("forro") && name.includes("pvc")) {
    const larg = name.match(/(\d+(?:\.\d+)?)\s*(?:mm|cm)/)?.[1];
    return `Forro de PVC${larg ? ` de ${larg}mm` : ""} de alta resistência, imune a cupins e umidade. Instalação simples, com encaixe macho-fêmea. Ideal para ambientes internos, cozinhas, banheiros e varandas. Superfície lavável e acabamento premium.`;
  }

  // --- FERRAMENTAS ---
  if (name.includes("furadeira") || name.includes("parafusadeira") || name.includes("serra") || name.includes("lixadeira")) {
    const potencia = name.match(/(\d+)\s*[wW]/)?.[1];
    const voltagem = name.match(/(\d+)\s*[vV]/)?.[1];
    return `Ferramenta elétrica de alto desempenho${potencia ? ` ${potencia}W` : ""}${voltagem ? `, ${voltagem}V` : ""}. Motor potente para uso profissional e doméstico, com design ergonômico para maior conforto e precisão no trabalho. Acompanha acessórios e manual de uso.`;
  }

  // --- ARGAMASSA / REJUNTE ---
  if (name.includes("argamassa")) {
    return `Argamassa industrializada de alta aderência, pronta para uso após mistura com água. Indicada para assentamento de cerâmicas, porcelanatos e revestimentos em pisos e paredes. Flexível, resistente a trincas e com excelente trabalhabilidade.`;
  }
  if (name.includes("rejunte")) {
    return `${productName} ideal para preenchimento de juntas entre cerâmicas, porcelanatos e pedras naturais. Resistente à umidade, fungos e manchas. Fácil aplicação e limpeza. Disponível em diversas cores para harmonizar com o revestimento.`;
  }

  // --- IMPERMEABILIZANTE / MANTA / VEDAÇÃO ---
  if (name.includes("impermeabilizante") || name.includes("manta impermeável") || name.includes("vedacit") || name.includes("vedação")) {
    const litros = name.match(/(\d+)\s*l/i)?.[1];
    return `${productName}${litros ? ` de ${litros}L` : ""} de alta performance para proteção contra infiltrações e umidade. Indicado para lajes, reservatórios, calhas, terraços e áreas sujeitas a umidade intensa. Fácil aplicação com rolo ou pincel. Resistência comprovada a raios UV.`;
  }

  // --- GESSO ---
  if (name.includes("gesso")) {
    const kg = name.match(/(\d+)\s*kg/)?.[1];
    return `Gesso${kg ? ` ${kg}kg` : ""} de alta pureza e resistência para revestimento interno de paredes e tetos. Pega rápida, superfície lisa e acabamento impecável. Ideal para obras residenciais e comerciais. Produto certificado conforme ABNT NBR 12128.`;
  }

  // --- AREIA / BRITA ---
  if (name.includes("areia") || name.includes("brita") || name.includes("pedra brita")) {
    const tipo = name.includes("brita") ? "Brita" : "Areia";
    return `${tipo} de construção de alta qualidade, limpa e peneirada. Utilizada em traços de concreto, argamassas, reboco e contrapisos. Material extraído de fontes controladas, dentro dos padrões ABNT. Entrega disponível em caminhão basculante.`;
  }

  // --- COLA / ADESIVO ---
  if (name.includes("cola") || name.includes("adesivo") || name.includes("silicone")) {
    return `${productName} de alta resistência para fixação e vedação em obras civis e reformas. Excelente aderência em superfícies de cerâmica, madeira, vidro, metal e plástico. Resistente à umidade e variações de temperatura.`;
  }

  // --- PARAFUSO / BUCHA / PREGO / FIXAÇÃO ---
  if (name.includes("parafuso") || name.includes("bucha") || name.includes("prego") || name.includes("pino") || name.includes("chumbador")) {
    return `${productName} de alta resistência para fixações em alvenaria, madeira e metal. Fabricado em aço zincado anticorrosivo. Ideal para instalações de móveis, estruturas metálicas, forros e revestimentos. Atende às normas de qualidade ABNT.`;
  }

  // --- TUBO / CONEXÃO HIDRÁULICA ---
  if (name.includes("tubo") || name.includes("cano") || name.includes("conex") || name.includes("joelho") || name.includes("luva") || name.includes("registro") || name.includes("torneira")) {
    return `${productName} para instalações hidráulicas residenciais e comerciais. Material de alta durabilidade, resistente à pressão e a corrosões. Compatível com os padrões ABNT. Ampla aplicação em redes de água fria, água quente, esgoto e drenagem.`;
  }

  // --- CABO / FIO ELÉTRICO / DISJUNTOR ---
  if (name.includes("cabo") || name.includes("fio elétrico") || name.includes("disjuntor") || name.includes("interruptor") || name.includes("tomada") || (name.includes("fio") && (name.includes("mm") || name.includes("awr")))) {
    return `${productName} com isolamento em PVC antichama e condutor de cobre eletrolítico. Alta condutividade elétrica, resistente ao calor e à umidade. Aprovado conforme normas ABNT NBR 6527. Indicado para instalações residenciais, comerciais e industriais.`;
  }

  // --- TINTA / IMPERMEABILIZANTE TINTAS ---
  if (name.includes("tinta") || name.includes("verniz") || name.includes("selador") || name.includes("primer") || name.includes("esmalte") || name.includes("textura")) {
    const litros = name.match(/(\d+[\d,.]*)\s*l/i)?.[1];
    return `${productName}${litros ? ` ${litros}L` : ""} com cobertura superior e acabamento profissional. Resistente ao desbotamento, umidade e fungos. Fácil aplicação com rolo, pincel ou pistola. Secagem rápida com excelente poder de cobertura por m². Indicado para superfícies internas e externas.`;
  }

  // --- DECK / ASSOALHO / PISO DE MADEIRA ---
  if (name.includes("deck") || name.includes("assoalho") || name.includes("piso madeira") || name.includes("lambri")) {
    return `${productName} de madeira nobre com tratamento de preservação e acabamento lixado. Ideal para áreas externas, piscinas, jardins e ambientes internos. Alta resistência ao desgaste, umidade e raios UV. Instalação simples com sistema de encaixe.`;
  }

  // --- PORTA / JANELA / ESQUADRIA ---
  if (name.includes("porta") || name.includes("janela") || name.includes("esquadria") || name.includes("batente") || name.includes("alizar")) {
    return `${productName} com acabamento premium e alta resistência estrutural. Fabricada com madeira selecionada, tratada contra cupins e umidade. Acompanha ferragens de qualidade. Indicada para ambientes residenciais e comerciais. Instalação rápida e precisa.`;
  }

  // --- ANDAIME / EPI / EQUIPAMENTO DE OBRA ---
  if (name.includes("andaime") || name.includes("capacete") || name.includes("luva proteção") || name.includes("bota") || name.includes("talha")) {
    return `${productName} certificado pelo INMETRO para uso em obras e ambientes industriais. Fabricado com materiais de alta resistência e durabilidade. Essencial para garantir a segurança do trabalhador conforme NR-6 e normas vigentes.`;
  }

  // --- DEFAULT GENÉRICO INTELIGENTE ---
  const medida = productName.match(/\d+[\d,.x\s]*(mm|cm|m|kg|g|L|un)/i)?.[0] || "";
  const hasNumber = /\d/.test(productName);
  return `${productName} de alta qualidade para obras residenciais e comerciais.${medida ? ` Especificação: ${medida}.` : ""} Produto com durabilidade comprovada, atendendo aos padrões técnicos exigidos pelo mercado da construção civil brasileiro.`;
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const brand = searchParams.get("brand") || "";

  if (!query) {
    return NextResponse.json({ error: "Falta o parâmetro q" }, { status: 400 });
  }

  try {
    const queryWords = query.trim().split(/\s+/).filter(Boolean);
    const brandClean = brand.trim();

    const stopWords = new Set([
      "cor", "amarelo", "preto", "azul", "verde", "vermelho", "branco", "cinza", "marrom", "amarela",
      "frequencia", "frequência", "freqüência", "hz", "volts", "volt", "v", "w", "watts", "amperagem",
      "110v", "220v", "127v", "50hz", "60hz", "cópia", "copia", "un", "unid", "unidades", "unidade",
      "bivolt", "voltagem", "potencia", "potência"
    ]);

    const filteredWords = queryWords.filter(w => w.length > 0 && !stopWords.has(w.toLowerCase()));

    let stage1Query = filteredWords.slice(0, 5).join(" ");
    if (brandClean && !stage1Query.toLowerCase().includes(brandClean.toLowerCase())) {
      stage1Query = `${stage1Query} ${brandClean}`;
    }

    // ✅ Run image search AND description robot in PARALLEL
    const [rawImages, scrapedDesc] = await Promise.all([
      // Image pipeline (sequential fallbacks inside)
      (async () => {
        let imgs = await fetchImagesFromBing(`${stage1Query} transparent`);
        if (imgs.length === 0) imgs = await fetchImagesFromGoogle(`${stage1Query} png`);
        if (imgs.length === 0 && queryWords.length > 2) {
          let q2 = queryWords.slice(0, 2).join(" ");
          if (brandClean && !q2.toLowerCase().includes(brandClean.toLowerCase())) q2 = `${q2} ${brandClean}`;
          imgs = await fetchImagesFromBing(`${q2} transparent`);
          if (imgs.length === 0) imgs = await fetchImagesFromGoogle(`${q2} png`);
        }
        if (imgs.length === 0 && queryWords.length > 0) {
          let q3 = queryWords[0];
          if (brandClean && !q3.toLowerCase().includes(brandClean.toLowerCase())) q3 = `${q3} ${brandClean}`;
          imgs = await fetchImagesFromBing(`${q3} transparent`);
          if (imgs.length === 0) imgs = await fetchImagesFromGoogle(`${q3} png`);
        }
        return imgs;
      })(),

      // Description robot
      scrapeProductDescription(query),
    ]);

    // De-duplicate and sort images (PNG first)
    const seen = new Set<string>();
    const uniqueImages = rawImages.filter(url => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });
    uniqueImages.sort((a, b) => {
      const aIsPng = a.toLowerCase().includes(".png") ? 1 : 0;
      const bIsPng = b.toLowerCase().includes(".png") ? 1 : 0;
      return bIsPng - aIsPng;
    });

    const slicedUrls = uniqueImages.slice(0, 15);

    // 🤖 Robot result first, smart generator as fallback
    const description = (scrapedDesc && scrapedDesc.length >= 25)
      ? scrapedDesc
      : generateSmartDescription(query);

    console.log(`[Search API] ✅ Done for "${query}" — ${slicedUrls.length} imgs, desc: ${description.slice(0, 60)}...`);

    return NextResponse.json({ images: slicedUrls, description });

  } catch (err: any) {
    console.error("API Search Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
