"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { saveData } from "@/lib/dataService";
import { AboutSection } from "./AboutSection";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Award, 
  ShieldCheck, 
  Check, 
  Star 
} from "lucide-react";

// ==========================================
// 1. REUSABLE PREMIUM SEO HEADER
// ==========================================
interface SeoHeaderProps {
  pageTitle: string;
  whatsappNumber?: string; // Default: '5579999999999' (Sergipe)
}

export function SeoHeader({ pageTitle, whatsappNumber }: SeoHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try {
        setSettings(JSON.parse(local));
      } catch (e) {}
    }
  }, []);

  const activeWhatsapp = settings?.whatsappNumber || whatsappNumber || "5579996298990";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Benefícios", href: "#beneficios" },
    { name: "Produtos", href: "#produtos" },
    { name: "Aplicações", href: "#aplicacoes" },
    { name: "Galeria", href: "#galeria" },
    { name: "Dúvidas", href: "#faq" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(`Olá! Visitei a página de ${pageTitle} e gostaria de solicitar um orçamento sem compromisso.`);
    window.open(`https://wa.me/${activeWhatsapp}?text=${text}`, "_blank");
  };

  return (
    <header className={`no-print w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-brown-dark/95 dark:bg-black/95 backdrop-blur-md shadow-lg py-2.5 border-b border-primary/25" 
        : "bg-brown-dark dark:bg-black py-4 border-b border-white/10"
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo - Links to initial eCommerce Page */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary text-brown-dark w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow shadow-primary group-hover:scale-105 transition-all">
            🪵
          </div>
          <div>
            <h1 className="font-display font-black text-lg md:text-xl tracking-tight text-white flex items-center gap-1 group-hover:text-primary transition duration-300">
              SÓ <span className="text-primary font-extrabold">MADEIRAS</span>
            </h1>
            <p className="text-[9px] tracking-widest text-primary font-bold -mt-1">MATERIAL DE CONSTRUÇÃO</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-stone-300 hover:text-primary font-medium text-sm transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs px-5 py-2.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Falar com Especialista</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-primary hover:bg-primary-hover text-brown-dark p-2 rounded-full shadow transition"
            title="Orçar via WhatsApp"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white rounded transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-brown-dark/98 dark:bg-black/98 backdrop-blur-lg border-b border-primary/20 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-stone-300 hover:text-primary font-bold text-base py-2 border-b border-white/5 transition"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-primary hover:bg-primary-hover text-brown-dark font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
          >
            <Phone className="h-4.5 w-4.5" />
            <span>Solicitar Orçamento Grátis</span>
          </button>
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. REUSABLE PREMIUM FAQ ACCORDION
// ==========================================
interface FAQItem {
  question: string;
  answer: string;
}

interface SeoFAQProps {
  items: FAQItem[];
}

export function SeoFAQ({ items }: SeoFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="bg-white dark:bg-dark-surface border border-stone-250 dark:border-dark-border rounded-2xl shadow-sm transition duration-300 overflow-hidden hover:border-primary/50"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-5 py-4 flex justify-between items-center text-left gap-4 font-bold text-brown-dark dark:text-white hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-sm md:text-base leading-snug">{item.question}</span>
              <div className={`p-1.5 rounded-full bg-slate-50 dark:bg-neutral-800 text-stone-900 dark:text-stone-100 font-medium transition-transform duration-300 ${isOpen ? "rotate-185 bg-primary/20 text-brown-dark dark:text-primary" : ""}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            
            {/* Smooth transition container */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[300px] border-t border-gray-150 dark:border-dark-border" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="p-5 text-xs md:text-sm text-stone-650 dark:text-stone-300 leading-relaxed bg-slate-50/50 dark:bg-neutral-905/30">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 3. REUSABLE PREMIUM LEAD FORM
// ==========================================
interface SeoFormProps {
  pageTitle: string;
  whatsappNumber?: string;
}

export function SeoForm({ pageTitle, whatsappNumber }: SeoFormProps) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try {
        setSettings(JSON.parse(local));
      } catch (e) {}
    }
  }, []);

  const activeWhatsapp = settings?.whatsappNumber || whatsappNumber || "5579996298990";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "SE",
    woodType: "Eucalipto Tratado"
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save to LocalStorage leads catalog so Cockpit Admin picks it up
    try {
      const existingLeadsStr = localStorage.getItem("somadeiras_leads") || "[]";
      const existingLeads = JSON.parse(existingLeadsStr);
      
      const newLead = {
        id: `lead-seo-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        source: `SEO - ${pageTitle}`,
        utm: `utm_source=google_seo&utm_medium=organic&utm_campaign=${encodeURIComponent(pageTitle.toLowerCase().replace(/ /g, "_"))}`,
        products: [`Orcamento de ${pageTitle} para ${formData.city}-${formData.state}`],
        total: 0,
        status: "Novo Lead",
        sellerId: "maria", // Assigned to Maria (Madeiras expert)
        device: typeof window !== "undefined" ? (window.innerWidth < 768 ? "Mobile / Browser" : "Desktop / Browser") : "Browser",
        location: `${formData.city} - ${formData.state}`,
        notes: `Interessado em ${pageTitle}. Lead gerado na página SEO institucional.`
      };

      saveData("somadeiras_leads", [newLead, ...existingLeads]);

      // Also trigger a system notification on the admin dashboard if active
      const notifsStr = localStorage.getItem("somadeiras_notifications") || "[]";
      const notifs = JSON.parse(notifsStr);
      const newNotif = {
        id: `notif-${Date.now()}`,
        text: `🌾 Novo Lead de SEO: ${formData.name} (${formData.city}-${formData.state}) interessado em ${pageTitle}!`,
        time: "Agora"
      };
      localStorage.setItem("somadeiras_notifications", JSON.stringify([newNotif, ...notifs]));

    } catch (err) {
      console.error("Erro ao salvar lead no LocalStorage", err);
    }

    // Prepare WhatsApp Message
    const msg = `Olá Só Madeiras! Gostaria de um orçamento formal de *${pageTitle}* para minha obra.\n\n*Dados do Cliente:*\n- *Nome:* ${formData.name}\n- *Telefone:* ${formData.phone}\n- *Cidade/UF:* ${formData.city} - ${formData.state}\n\nAguardo o contato com a cotação e frete. Obrigado!`;
    const whatsappUrl = `https://wa.me/${activeWhatsapp}?text=${encodeURIComponent(msg)}`;

    // Timeout to show success state before redirecting
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        city: "",
        state: "SE",
        woodType: "Eucalipto Tratado"
      });
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-xl overflow-hidden border border-stone-250 dark:border-dark-border max-w-xl mx-auto transition-all">
      <div className="bg-gradient-to-br from-brown-dark to-stone-900 text-white p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-full filter blur-2xl opacity-15 -mr-6 -mt-6" />
        <span className="bg-primary text-brown-dark font-black text-[9px] px-2.5 py-0.5 rounded-full tracking-wider uppercase inline-block mb-2 shadow-xs">
          Orçamento Rápido
        </span>
        <h3 className="font-display font-black text-xl md:text-2xl leading-tight">Garantir Preço de Tabela & Frete Reduzido</h3>
        <p className="text-[11px] md:text-xs text-stone-300 mt-2 leading-relaxed">
          Preencha o formulário abaixo em 30 segundos. Nosso time de especialistas de Sergipe fará a cubagem exata da sua madeira e calculará o menor custo de frete para sua região!
        </p>
      </div>

      {submitted ? (
        <div className="p-8 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="h-10 w-10 animate-bounce" />
          </div>
          <h4 className="font-bold text-lg text-brown-dark dark:text-white">Lead Capturado com Sucesso!</h4>
          <p className="text-xs text-stone-800 dark:text-stone-100 font-medium max-w-xs mx-auto">
            Estamos preparando sua ficha técnica e cotação de frete. Você será redirecionado para o WhatsApp corporativo em instantes...
          </p>
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto pt-2"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-100 font-medium uppercase tracking-wider block">Nome Completo</label>
            <input
              type="text"
              required
              placeholder="Ex: Roberto Silva Santos"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-stone-50 dark:bg-neutral-900 border border-stone-250 dark:border-dark-border rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-100 font-medium uppercase tracking-wider block">Telefone / WhatsApp com DDD</label>
            <input
              type="tel"
              required
              placeholder="Ex: 79 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-stone-50 dark:bg-neutral-900 border border-stone-250 dark:border-dark-border rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-100 font-medium uppercase tracking-wider block">Cidade de Entrega</label>
              <input
                type="text"
                required
                placeholder="Ex: Estância, Aracaju, Lagarto"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-stone-50 dark:bg-neutral-900 border border-stone-250 dark:border-dark-border rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-100 font-medium uppercase tracking-wider block">Estado</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-stone-50 dark:bg-neutral-900 border border-stone-250 dark:border-dark-border rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition cursor-pointer"
              >
                <option value="SE">Sergipe (SE)</option>
                <option value="AL">Alagoas (AL)</option>
                <option value="BA">Bahia (BA)</option>
                <option value="PE">Pernambuco (PE)</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2">
            <input type="checkbox" defaultChecked required className="mt-0.5 w-4 h-4 accent-primary cursor-pointer" />
            <p className="text-[10px] text-stone-400 leading-normal">
              Autorizo o time técnico da Só Madeiras a realizar o cálculo volumétrico das toras, estimativa de frete com transportadoras locais e concordo com os Termos de Uso.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-xs md:text-sm cursor-pointer mt-2"
          >
            <Phone className="h-4.5 w-4.5" />
            <span>SOLICITAR ORÇAMENTO NO WHATSAPP</span>
          </button>
        </form>
      )}
    </div>
  );
}

// ==========================================
// 4. REUSABLE PREMIUM SEO FOOTER
// ==========================================
interface SeoFooterProps {
  pageTitle?: string;
  regionsText?: string;
  whatsappNumber?: string;
}

export function SeoFooter({ 
  pageTitle = "Só Madeiras", 
  regionsText = "Atendemos com frota própria em Estância, Aracaju, Itabaiana, Lagarto, Propriá, Tobias Barreto, Nossa Senhora do Socorro e todo o estado de Sergipe e norte da Bahia.", 
  whatsappNumber = "5579996298990" 
}: SeoFooterProps) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try {
        setSettings(JSON.parse(local));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const activeSettings = settings || {
    address: "Av. Contorno, 465, Estância - SE, CEP 49200-000",
    phone: "(79) 99629-8990",
    whatsappNumber: "5579996298990",
    workHours: "Segunda a Sexta: 07h30 às 17h30 | Sábado: 07h30 às 12h",
    regionsText: "Atendemos com frota própria em Estância, Aracaju, Itabaiana, Lagarto, Propriá, Tobias Barreto, Nossa Senhora do Socorro e todo o estado de Sergipe e norte da Bahia.",
    instagramUrl: "https://instagram.com/somadeiras",
    facebookUrl: "https://facebook.com/somadeiras",
    youtubeUrl: "https://youtube.com/somadeiras"
  };

  const activeWhatsapp = activeSettings.whatsappNumber || whatsappNumber;

  return (
    <>
      <AboutSection />
      <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 py-12 px-4 text-xs md:text-sm select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-brown-dark w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">🪵</div>
            <h4 className="font-display font-black text-white text-base">SÓ MADEIRAS</h4>
          </div>
          <p className="text-neutral-500 leading-relaxed text-xs">
            Fornecimento líder de eucalipto tratado em autoclave e madeiras de alta durabilidade em Sergipe. Soluções premium para cercas, fazendas, galpões e projetos paisagísticos.
          </p>
          <div className="flex gap-3 text-neutral-400 text-lg pt-1">
            <a href={activeSettings.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition cursor-pointer" title="Facebook">📘</a>
            <a href={activeSettings.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition cursor-pointer" title="Instagram">📸</a>
            <a href={activeSettings.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition cursor-pointer" title="YouTube">🎥</a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Produtos Premium</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/mourao-de-eucalipto-tratado" className="hover:text-white transition">Mourões de Eucalipto</Link></li>
            <li><Link href="/postes-de-eucalipto-tratado" className="hover:text-white transition">Postes de Eucalipto</Link></li>
            <li><Link href="/eucalipto-tratado-estancia-se" className="hover:text-white transition">Eucalipto em Estância-SE</Link></li>
            <li><Link href="/pergolados" className="hover:text-white transition">Simulador de Pergolados</Link></li>
            <li><Link href="/galpoes-currais" className="hover:text-white transition">Simulador de Galpões e Currais</Link></li>
          </ul>
        </div>

        {/* Regional details Column */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Atendimento Sergipe</h5>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span>{activeSettings.phone} (Orçamentos WhatsApp)</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span>Pátio Regional: {activeSettings.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span>{activeSettings.workHours}</span>
            </li>
          </ul>
        </div>

        {/* Dynamic SEO Area Column */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Regiões Atendidas</h5>
          <p className="text-neutral-500 leading-relaxed text-xs">
            {activeSettings.regionsText || regionsText}
          </p>
          <div className="mt-4 bg-neutral-850 p-2.5 rounded border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-[10px] text-white uppercase tracking-wider">Cotação Rápida</p>
              <p className="text-[10px] text-neutral-400">Atendimento Técnico Direto</p>
            </div>
            <a 
              href={`https://wa.me/${activeWhatsapp}?text=Olá! Gostaria de falar com um especialista sobre ${encodeURIComponent(pageTitle)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded font-bold text-[10px] uppercase shadow transition whitespace-nowrap"
            >
              Chamar
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-8 pt-6 text-center text-neutral-600 text-xs">
        <p>© {new Date().getFullYear()} SÓ MADEIRAS MATERIAIS DE CONSTRUÇÃO LTDA. Todos os direitos reservados. Faturamento direto para produtores rurais e CNPJ.</p>
      </div>
    </footer>
    </>
  );
}
