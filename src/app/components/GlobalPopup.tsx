"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

interface PopupConfig {
  id: string;
  title: string;
  description: string;
  flyerImage: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  buttonTextColor: string;
  roundedBorder: "none" | "md" | "xl" | "3xl" | "full";
  bgType: "flat" | "gradient" | "glass";
  bgColor1: string;
  bgColor2: string;
  animation: "fade" | "slide-up" | "zoom" | "bounce";
  triggerType: "delay" | "scroll" | "exit-intent";
  triggerValue: number;
  targetPage: "home" | "forro" | "pergolado" | "all";
  isActive: boolean;
}

export default function GlobalPopup() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const triggerFired = useRef(false);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load and watch configurations
  useEffect(() => {
    if (!mounted) return;

    const loadConfig = () => {
      try {
        const saved = localStorage.getItem("somadeiras_active_popup");
        if (saved) {
          const parsed = JSON.parse(saved) as PopupConfig;
          setConfig(parsed);
        } else {
          // Default fallback popup campaign
          const defaultCampaign: PopupConfig = {
            id: "popup-camp",
            title: "🔥 GRANDE FEIRÃO SÓ MADEIRAS!",
            description: "Descontos imperdíveis de até 20% em vigas de Cambará, decks de Ipê e pergolados roliços apenas nesta semana. Clique e chame um vendedor!",
            flyerImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
            buttonText: "⚡ Falar com Vendedor no WhatsApp",
            buttonLink: "https://api.whatsapp.com/send?phone=5579996298990&text=Olá,%20tenho%20interesse%20nas%20ofertas%20do%20Feirão%20Só%20Madeiras!",
            buttonColor: "#F4B400",
            buttonTextColor: "#3E2723",
            roundedBorder: "xl",
            bgType: "gradient",
            bgColor1: "#3E2723",
            bgColor2: "#5D4037",
            animation: "slide-up",
            triggerType: "delay",
            triggerValue: 3,
            targetPage: "home",
            isActive: true
          };
          setConfig(defaultCampaign);
        }
      } catch (err) {
        console.error("Erro ao carregar popup config:", err);
      }
    };

    loadConfig();

    // Listen for custom trigger to reload configuration (for live preview updates)
    const handleReload = () => {
      loadConfig();
    };

    window.addEventListener("somadeiras_reload_popup", handleReload);
    return () => {
      window.removeEventListener("somadeiras_reload_popup", handleReload);
    };
  }, [mounted]);

  // Set up triggers
  useEffect(() => {
    if (!mounted || !config || !config.isActive) return;

    // Expose a helper to reset dismissed status for immediate testing
    (window as any).resetSomadeirasPopup = () => {
      sessionStorage.removeItem("somadeiras_popup_dismissed");
      triggerFired.current = false;
      setIsVisible(false);
      setIsRendered(false);
      window.dispatchEvent(new Event("somadeiras_reload_popup"));
    };

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("somadeiras_popup_dismissed");
    if (isDismissed === "true") {
      return;
    }

    // Target Page Verification
    const pathname = window.location.pathname;
    let pageMatches = false;

    if (config.targetPage === "all") {
      pageMatches = true;
    } else if (config.targetPage === "home" && pathname === "/") {
      pageMatches = true;
    } else if (config.targetPage === "forro" && pathname.includes("/forro-pvc")) {
      pageMatches = true;
    } else if (config.targetPage === "pergolado" && pathname.includes("/pergolados")) {
      pageMatches = true;
    }

    if (!pageMatches) return;

    // Trigger activation function
    const firePopup = () => {
      if (triggerFired.current) return;
      triggerFired.current = true;
      setIsRendered(true);
      // Small timeout to allow transition styles to bind
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    };

    // Delay Trigger
    if (config.triggerType === "delay") {
      const delayMs = (config.triggerValue || 3) * 1000;
      const timer = setTimeout(() => {
        firePopup();
      }, delayMs);
      return () => clearTimeout(timer);
    }

    // Scroll Trigger
    if (config.triggerType === "scroll") {
      const targetPercent = config.triggerValue || 30;
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const scrolled = (scrollTop / docHeight) * 100;
        if (scrolled >= targetPercent) {
          firePopup();
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Exit Intent Trigger
    if (config.triggerType === "exit-intent") {
      // Desktop: Detect mouse leaving browser window upwards
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 20) {
          firePopup();
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      // Mobile/Tablet: Detect rapid scroll up OR focus blur
      let lastScrollY = window.scrollY;
      const handleMobileScroll = () => {
        const currentScrollY = window.scrollY;
        const diff = lastScrollY - currentScrollY;
        // User scrolls up rapidly (50px difference or more) while scrolled down
        if (diff > 50 && currentScrollY > 200) {
          firePopup();
          window.removeEventListener("scroll", handleMobileScroll);
        }
        lastScrollY = currentScrollY;
      };

      // Browser tab switch or window focus lost (very common on mobile address bar click)
      const handleBlur = () => {
        firePopup();
        window.removeEventListener("blur", handleBlur);
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleMobileScroll);
      window.addEventListener("blur", handleBlur);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", handleMobileScroll);
        window.removeEventListener("blur", handleBlur);
      };
    }
  }, [mounted, config]);

  if (!mounted || !config || !config.isActive || !isRendered) return null;

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("somadeiras_popup_dismissed", "true");
    setTimeout(() => {
      setIsRendered(false);
    }, 400); // Wait for fade-out transition
  };

  const getBorderRadiusClass = () => {
    switch (config.roundedBorder) {
      case "none": return "rounded-none";
      case "md": return "rounded-md";
      case "xl": return "rounded-xl";
      case "3xl": return "rounded-3xl";
      case "full": return "rounded-[2rem]";
      default: return "rounded-xl";
    }
  };

  const getAnimationStyles = () => {
    if (!isVisible) {
      return {
        opacity: 0,
        transform: "scale(0.95)",
        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)"
      };
    }

    switch (config.animation) {
      case "fade":
        return {
          animation: "popupFadeIn 0.4s ease-out forwards",
        };
      case "slide-up":
        return {
          animation: "popupSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        };
      case "zoom":
        return {
          animation: "popupZoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        };
      case "bounce":
        return {
          animation: "popupBounceIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 1.4) forwards",
        };
      default:
        return {
          animation: "popupFadeIn 0.4s ease-out forwards",
        };
    }
  };

  // Determine Backdrop Styling
  const getBackdropStyles = () => {
    if (config.bgType === "glass") {
      return {
        background: "rgba(30, 20, 15, 0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      };
    }
    return {};
  };

  // Determine Card Background Styling
  const getCardBgStyles = () => {
    if (config.bgType === "flat") {
      return { backgroundColor: config.bgColor1 || "#3E2723" };
    }
    if (config.bgType === "gradient") {
      return {
        background: `linear-gradient(135deg, ${config.bgColor1 || "#3E2723"} 0%, ${config.bgColor2 || "#1E0F0B"} 100%)`
      };
    }
    if (config.bgType === "glass") {
      return {
        background: "rgba(62, 39, 35, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      };
    }
    return { backgroundColor: "#3E2723" };
  };

  return (
    <>
      {/* Dynamic Keyframes injected at runtime */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translateY(120px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popupZoomIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes popupBounceIn {
          0% { opacity: 0; transform: translateY(-150px) scale(0.9); }
          50% { opacity: 0.95; transform: translateY(12px) scale(1.03); }
          75% { transform: translateY(-4px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      {/* Backdrop overlay */}
      <div 
        onClick={handleClose}
        style={getBackdropStyles()}
        className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/65 transition-opacity duration-300 no-print ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Card Container */}
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            ...getCardBgStyles(),
            ...getAnimationStyles(),
          }}
          className={`w-full max-w-[550px] shadow-2xl relative border border-white/10 text-white overflow-hidden ${getBorderRadiusClass()}`}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/75 text-white p-2 rounded-full transition active:scale-95 border border-white/10"
            aria-label="Fechar Popup"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Flyer Image */}
          {config.flyerImage && (
            <div className="w-full relative h-[240px] xs:h-[280px] bg-neutral-900 flex items-center justify-center overflow-hidden group">
              <img 
                src={config.flyerImage} 
                alt={config.title || "Oferta Especial Só Madeiras"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80";
                }}
              />
              {/* Subtle elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Text contents */}
          <div className="p-6 md:p-8 space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full inline-block">
                ⚡ Oferta Exclusiva
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight leading-tight">
                {config.title || "Oferta Especial!"}
              </h3>
            </div>
            
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans font-medium">
              {config.description}
            </p>

            {/* Custom CTA Button */}
            {config.buttonText && (
              <div className="pt-2">
                <a 
                  href={config.buttonLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  style={{
                    backgroundColor: config.buttonColor || "#F4B400",
                    color: config.buttonTextColor || "#3E2723",
                  }}
                  className={`w-full py-3.5 px-6 font-display font-black text-xs md:text-sm shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 group ${
                    config.roundedBorder === "full" ? "rounded-full" : getBorderRadiusClass()
                  }`}
                >
                  {config.buttonText}
                  <ExternalLink className="h-4 w-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
