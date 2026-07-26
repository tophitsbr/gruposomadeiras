"use client";

import React, { useState, useEffect } from "react";

export function AboutSection() {
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
    aboutText: "Fundada com o compromisso de entregar o que há de melhor em madeiras de lei e materiais de construção, a Só Madeiras é referência na região de Estância/SE. Nosso pátio conta com amplo estoque de eucalipto tratado em autoclave, vigamentos de Angelim Vermelho, Tauari, portas premium e telhas de alto desempenho. Atendemos construtores, produtores rurais e clientes residenciais com faturamento facilitado e entrega rápida em todo o sul do estado de Sergipe.",
    address: "Av. Contorno, 465, Estância - SE, CEP 49200-000",
    phone: "(79) 99629-8990",
    whatsappNumber: "5579996298990",
    workHours: "Segunda a Sexta: 07h30 às 17h30 | Sábado: 07h30 às 12h",
    mapsEmbedUrl: "https://maps.google.com/maps?q=So%20Madeiras,%20Est%C3%A2ncia%20-%20SE&t=&z=14&ie=UTF8&iwloc=&output=embed",
    mapsSearchUrl: "https://www.google.com/maps/search/S%C3%B3+Madeiras+Est%C3%A2ncia+SE",
    showroomImage: "/images/so_madeiras_fachada.png"
  };

  return (
    <section className="bg-stone-50 dark:bg-zinc-950 border-t border-stone-200 dark:border-neutral-850 py-16 px-4 md:px-8 select-none no-print">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold">Tradição & Qualidade</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-stone-850 dark:text-white uppercase tracking-tight mt-1">
            Sobre a Só Madeiras
          </h2>
          <div className="w-12 h-1 bg-primary mt-3 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card (Column 1) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-stone-150 dark:border-neutral-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div className="space-y-6">
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
                Fundada com o compromisso de entregar o que há de melhor em madeiras de lei e materiais de construção, a <strong className="text-stone-850 dark:text-white font-semibold">Só Madeiras</strong> é referência na região de Estância/SE. 
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
                {activeSettings.aboutText}
              </p>
            </div>

            <div className="border-t border-stone-100 dark:border-neutral-800 pt-6 mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-stone-850 dark:text-white">Pátio e Showroom</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{activeSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-stone-850 dark:text-white">Atendimento / WhatsApp</p>
                  <a href={`https://wa.me/${activeSettings.whatsappNumber || "5579996298990"}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-0.5 block font-semibold">
                    {activeSettings.phone} (Fale com um Especialista)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">⏰</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-stone-850 dark:text-white">Horário de Funcionamento</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{activeSettings.workHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Showroom Image (Column 2) */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-stone-150 dark:border-neutral-800 shadow-xs flex flex-col group hover:shadow-md transition-all duration-300">
            <div className="relative flex-1 min-h-[220px] overflow-hidden">
              <img 
                src={activeSettings.showroomImage || "/images/so_madeiras_fachada.png"} 
                alt="Fachada Só Madeiras Estância" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 bg-primary text-brown-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Unidade Estância / SE
              </span>
            </div>
            <div className="p-6">
              <h4 className="font-display font-black text-base text-stone-850 dark:text-white uppercase">Infraestrutura Premium</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                Madeiras de alta densidade estocadas sob condições ideais de ventilação e secagem, garantindo estabilidade mecânica em suas obras. Visite nosso showroom físico e confira de perto a qualidade das peças.
              </p>
            </div>
          </div>

          {/* Google Maps (Column 3) */}
          <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-stone-150 dark:border-neutral-800 shadow-xs p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div className="mb-4">
              <h4 className="font-display font-black text-sm text-stone-850 dark:text-white uppercase">Localização no Mapa</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Localizados na rodovia de contorno BR-101 para fácil acesso e logística rápida.</p>
            </div>
            <div className="flex-1 w-full min-h-[200px] rounded-2xl overflow-hidden border border-stone-100 dark:border-neutral-800">
              <iframe
                src={activeSettings.mapsEmbedUrl || "https://maps.google.com/maps?q=So%20Madeiras,%20Est%C3%A2ncia%20-%20SE&t=&z=14&ie=UTF8&iwloc=&output=embed"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Só Madeiras Estância"
              />
            </div>
            <div className="mt-4">
              <a 
                href={activeSettings.mapsSearchUrl || "https://www.google.com/maps/search/S%C3%B3+Madeiras+Est%C3%A2ncia+SE"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-750 dark:text-stone-300 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition text-center block"
              >
                Abrir no Google Maps 🗺️
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
