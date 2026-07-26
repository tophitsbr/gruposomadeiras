import { MetadataRoute } from "next";

// Database product IDs for sitemap generation
const PRODUCT_IDS = Array.from({ length: 19 }, (_, i) => i + 1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://somadeiras.com.br";

  // 1. Static and Institutional SEO Landing Routes
  const staticRoutes = [
    "",
    "/pergolados",
    "/galpoes-currais",
    "/forro-pvc",
    "/eucalipto-tratado-estancia-se",
    "/mourao-de-eucalipto-tratado",
    "/postes-de-eucalipto-tratado",
    "/portas-de-madeira",
    "/portas-semiocas",
    "/portas-pivotantes",
    "/janelas-de-madeira",
    "/calculadora-telhado",
    "/lookbook",
    "/profissionais",
    "/sorteio"
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // 2. Dynamic Product Pages (1 to 19)
  const productRoutes = PRODUCT_IDS.map(id => ({
    url: `${baseUrl}/produtos/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...productRoutes];
}
