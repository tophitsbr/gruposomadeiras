/**
 * 🛡️ SISTEMA DE ARQUITETURA DE SEGURANÇA PROFISSIONAL
 * Módulo Central de Segurança - Só Madeiras
 * 
 * Implementa princípios de Defense in Depth, Zero Trust, auditoria e detecção comportamental.
 */

export interface SecurityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  ip: string;
  city: string;
  country: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  userAgent: string;
  sessionToken: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  ip: string;
  city: string;
  country: string;
  userAgent: string;
  os: string;
  browser: string;
  fingerprint: string;
  endpoint: string;
  user: string;
  sessionToken: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  actionTaken: string;
  attackType: string;
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  ip: string;
  status: "Aberto" | "Investigando" | "Resolvido" | "Falso Positivo";
  notes: string;
  fingerprint: string;
}

export interface SecuritySession {
  id: string;
  userEmail: string;
  userRole: string;
  ip: string;
  city: string;
  country: string;
  userAgent: string;
  os: string;
  browser: string;
  createdAt: string;
  lastActive: string;
  token: string;
  isActive: boolean;
}

export interface SecurityConfig {
  threatLimit: number;
  rateLimitLogin: number;
  rateLimitSearch: number;
  rateLimitApi: number;
  cloudflareWaf: boolean;
  cloudflareTurnstile: boolean;
  cloudflareZeroTrust: boolean;
  cloudflareBotManager: boolean;
  turnstileSiteKey: string;
  blockTor: boolean;
  blockVpn: boolean;
  mfaEnabled: boolean;
}

// Default settings
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  threatLimit: 150,
  rateLimitLogin: 5,
  rateLimitSearch: 100,
  rateLimitApi: 60,
  cloudflareWaf: false,
  cloudflareTurnstile: false,
  cloudflareZeroTrust: false,
  cloudflareBotManager: false,
  turnstileSiteKey: "0x4AAAAAAAPo-g2u0P_d7Wk1",
  blockTor: true,
  blockVpn: false,
  mfaEnabled: false,
};

// Attack risk weight definition
export const THREAT_SCORES = {
  SQL_INJECTION: 100,
  XSS: 80,
  CSRF: 70,
  BRUTE_FORCE: 60,
  CRAWLER: 20,
  SCRAPER: 40,
  HEADLESS_BROWSER: 50,
  SUSPICIOUS_UA: 20,
  INVALID_TOKEN: 30,
  FINGERPRINT_MISMATCH: 40,
  EXCESSIVE_REQUESTS: 50,
  IP_CHURN: 30,
};

/**
 * Parses user agent string into structured client info
 */
export function parseUserAgent(uaString: string) {
  const ua = uaString.toLowerCase();
  let os = "Desconhecido";
  let browser = "Desconhecido";

  // Detect OS
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("macintosh") || ua.includes("mac os")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";

  // Detect Browser
  if (ua.includes("edg/")) browser = "Microsoft Edge";
  else if (ua.includes("chrome") && !ua.includes("chromium")) browser = "Google Chrome";
  else if (ua.includes("firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Apple Safari";
  else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";
  else if (ua.includes("headless")) browser = "Headless Chrome / Automation";

  const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);

  return { os, browser, isMobile };
}

/**
 * Generate a unique canvas-based fingerprint using native hashing
 */
export async function generateFingerprint(): Promise<string> {
  if (typeof window === "undefined") return "server-side-fingerprint";

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "canvas-unsupported";

    // Draw text with shadow, fonts and colors to build device/browser specifics
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial', sans-serif";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Só Madeiras 🛡️ Security v1.0", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Fingerprinting Check WebGL", 4, 17);

    const canvasData = canvas.toDataURL();
    
    // Mix with other client properties
    const clientData = [
      canvasData,
      navigator.userAgent,
      screen.colorDepth,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      navigator.language,
      navigator.hardwareConcurrency || 4,
      (navigator as any).deviceMemory || 8,
    ].join("|");

    // Hash clientData with SHA-256 using Crypto Web API
    const encoder = new TextEncoder();
    const data = encoder.encode(clientData);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex.slice(0, 32);
  } catch (err) {
    console.error("Erro gerando fingerprint:", err);
    // Simple fallback
    return "fp_" + Math.random().toString(36).substring(2, 15);
  }
}

/**
 * Checks a string for potential injections (SQL, XSS, Path Traversal, Command Injection)
 */
export function inspectInput(input: string): { matches: boolean; type: string; score: number } {
  if (!input || typeof input !== "string") return { matches: false, type: "", score: 0 };

  const lower = input.toLowerCase();

  // 1. SQL Injection Patterns
  const sqliPatterns = [
    /\bselect\b.*\bfrom\b/i,
    /\bunion\b.*\bselect\b/i,
    /\binsert\b.*\binto\b/i,
    /\bdelete\b.*\bfrom\b/i,
    /drop\s+table/i,
    /'\s*or\s*'\d+'\s*=\s*'\d+'/i,
    /--/i,
    /xp_cmdshell/i,
    /\bexec\b/i
  ];
  for (const pattern of sqliPatterns) {
    if (pattern.test(lower)) {
      return { matches: true, type: "SQL Injection", score: THREAT_SCORES.SQL_INJECTION };
    }
  }

  // 2. Cross-Site Scripting (XSS) Patterns
  const xssPatterns = [
    /<script.*?>/i,
    /<\/script>/i,
    /javascript:/i,
    /onload\s*=/i,
    /onerror\s*=/i,
    /onclick\s*=/i,
    /eval\(/i,
    /document\.cookie/i,
    /window\.location/i,
    /alert\(/i
  ];
  for (const pattern of xssPatterns) {
    if (pattern.test(lower)) {
      return { matches: true, type: "XSS (Cross-Site Scripting)", score: THREAT_SCORES.XSS };
    }
  }

  // 3. Path Traversal & Directory Traversal
  const pathTraversal = [
    /\.\.\//,
    /\.\.\\/,
    /\/etc\/passwd/i,
    /c:\\windows\\system32/i,
    /cmd\.exe/i
  ];
  for (const pattern of pathTraversal) {
    if (pattern.test(lower)) {
      return { matches: true, type: "Directory Traversal / LFI", score: 100 };
    }
  }

  // 4. Remote Code Execution (RCE) / System Calls
  if (lower.includes("curl ") || lower.includes("wget ") || lower.includes("rm -rf") || lower.includes("chmod ")) {
    return { matches: true, type: "RCE Attempt", score: 120 };
  }

  return { matches: false, type: "", score: 0 };
}

/**
 * Behavioral Scoring for Scrapers (Tracks clicks, visibility state, scroll speed)
 */
export class ScraperDefense {
  private mouseMoves = 0;
  private scrollEvents = 0;
  private clicks = 0;
  private startTime: number;
  private focusLosses = 0;
  private isHeadless = false;

  constructor() {
    this.startTime = Date.now();
    if (typeof window !== "undefined") {
      this.detectAutomation();
    }
  }

  private detectAutomation() {
    if (typeof window === "undefined") return;

    // Detect standard Headless variables set by automation tools
    const webdriver = navigator.webdriver;
    const isHeadlessUA = /headless|puppeteer|selenium|playwright/i.test(navigator.userAgent);
    
    // Check for automation variables injected by Selenium, etc.
    const hasWebdriverVar = !!(window as any)._phantom || 
                            !!(window as any).__phantom ||
                            !!(window as any).__selenium_evaluate ||
                            !!(window as any).__webdriver_evaluate ||
                            !!(window as any)._selenium ||
                            !!(window as any).cdc_adoQyhk5c4cjftg7hchgfc_Array ||
                            !!(window as any).cdc_adoQyhk5c4cjftg7hchgfc_Promise;

    // Chrome specific automation checking
    const isAutomationChrome = !(window as any).chrome && /chrome/i.test(navigator.userAgent);

    if (webdriver || isHeadlessUA || hasWebdriverVar || isAutomationChrome) {
      this.isHeadless = true;
    }
  }

  public trackMouseMove() {
    this.mouseMoves++;
  }

  public trackScroll() {
    this.scrollEvents++;
  }

  public trackClick() {
    this.clicks++;
  }

  public trackBlur() {
    this.focusLosses++;
  }

  public evaluateScore(): { score: number; classification: "Humano" | "Suspeito" | "Bot" } {
    const elapsedSeconds = (Date.now() - this.startTime) / 1000;
    
    if (this.isHeadless) {
      return { score: 100, classification: "Bot" };
    }

    // A real user exhibits a natural progression of mouse movements, scrolls, and clicks
    // Scrapers fetch and parse or scroll at mechanical intervals
    let suspicionScore = 0;

    // Crawler/scraper pattern: high requests/scrolls with no mouse movement
    if (this.scrollEvents > 15 && this.mouseMoves < 5) {
      suspicionScore += 50;
    }

    // Instant clicking / inhuman speed
    if (elapsedSeconds > 0.5) {
      const clickRate = this.clicks / elapsedSeconds;
      if (clickRate > 8) suspicionScore += 40; // Too fast to be human
    }

    // Zero focus loss, zero clicks, but 100% scrolling
    if (this.clicks === 0 && this.scrollEvents > 30 && this.mouseMoves === 0) {
      suspicionScore += 60;
    }

    // Classification
    let classification: "Humano" | "Suspeito" | "Bot" = "Humano";
    if (suspicionScore >= 80) classification = "Bot";
    else if (suspicionScore >= 45) classification = "Suspeito";

    return { score: suspicionScore, classification };
  }
}

/**
 * Central State Repository (Simulates backend storage in localStorage)
 */
export class SecurityRepository {
  private static mockIps = [
    { ip: "189.120.45.18", city: "Campinas", country: "Brasil" },
    { ip: "177.30.224.91", city: "São Paulo", country: "Brasil" },
    { ip: "179.99.112.5", city: "Aracaju", country: "Brasil" },
    { ip: "201.55.8.199", city: "Rio de Janeiro", country: "Brasil" },
    { ip: "45.185.134.58", city: "Estância", country: "Brasil" }
  ];

  public static getClientIp(): { ip: string; city: string; country: string } {
    if (typeof window === "undefined") return { ip: "127.0.0.1", city: "Localhost", country: "Local" };
    
    // Retrieve or set user IP simulation to keep IP consistent per visitor
    let ipData = sessionStorage.getItem("somadeiras_simulated_ip");
    if (!ipData) {
      const randomIp = this.mockIps[Math.floor(Math.random() * this.mockIps.length)];
      sessionStorage.setItem("somadeiras_simulated_ip", JSON.stringify(randomIp));
      return randomIp;
    }
    return JSON.parse(ipData);
  }

  public static getLogs(): SecurityLog[] {
    if (typeof window === "undefined") return [];
    try {
      const logs = localStorage.getItem("somadeiras_security_logs");
      return logs ? JSON.parse(logs) : [];
    } catch { return []; }
  }

  public static addLog(action: string, user: string, details: string, risk: SecurityLog["risk"]) {
    if (typeof window === "undefined") return;
    const ipInfo = this.getClientIp();
    const logs = this.getLogs();
    const newLog: SecurityLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      user: user || "Convidado",
      details,
      ip: ipInfo.ip,
      city: ipInfo.city,
      country: ipInfo.country,
      risk,
      userAgent: navigator.userAgent,
      sessionToken: sessionStorage.getItem("somadeiras_session_token") || "sess-anonymous"
    };
    
    const updated = [newLog, ...logs].slice(0, 1000); // Limit to 1000 logs
    localStorage.setItem("somadeiras_security_logs", JSON.stringify(updated));
  }

  public static getAlerts(): SecurityAlert[] {
    if (typeof window === "undefined") return [];
    try {
      const alerts = localStorage.getItem("somadeiras_security_alerts");
      return alerts ? JSON.parse(alerts) : [];
    } catch { return []; }
  }

  public static addAlert(alert: Omit<SecurityAlert, "id" | "timestamp">) {
    if (typeof window === "undefined") return;
    const alerts = this.getAlerts();
    const newAlert: SecurityAlert = {
      ...alert,
      id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("somadeiras_security_alerts", JSON.stringify([newAlert, ...alerts]));
  }

  public static getIncidents(): SecurityIncident[] {
    if (typeof window === "undefined") return [];
    try {
      const incidents = localStorage.getItem("somadeiras_security_incidents");
      return incidents ? JSON.parse(incidents) : [];
    } catch { return []; }
  }

  public static addIncident(title: string, description: string, riskLevel: SecurityIncident["riskLevel"]) {
    if (typeof window === "undefined") return;
    const incidents = this.getIncidents();
    const ipInfo = this.getClientIp();
    
    // Check if incident with same title is already open to avoid spam
    const hasOpenIncident = incidents.some(inc => inc.title === title && inc.status !== "Resolvido" && inc.ip === ipInfo.ip);
    if (hasOpenIncident) return;

    const newIncident: SecurityIncident = {
      id: `inc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      title,
      description,
      riskLevel,
      ip: ipInfo.ip,
      status: "Aberto",
      notes: "",
      fingerprint: sessionStorage.getItem("somadeiras_device_fp") || "unknown"
    };

    localStorage.setItem("somadeiras_security_incidents", JSON.stringify([newIncident, ...incidents]));
  }

  public static updateIncidentStatus(id: string, status: SecurityIncident["status"], notes: string) {
    if (typeof window === "undefined") return;
    const incidents = this.getIncidents();
    const updated = incidents.map(inc => inc.id === id ? { ...inc, status, notes } : inc);
    localStorage.setItem("somadeiras_security_incidents", JSON.stringify(updated));
  }

  public static getSessions(): SecuritySession[] {
    if (typeof window === "undefined") return [];
    try {
      const sessions = localStorage.getItem("somadeiras_security_sessions");
      return sessions ? JSON.parse(sessions) : [];
    } catch { return []; }
  }

  public static addSession(userEmail: string, userRole: string, token: string) {
    if (typeof window === "undefined") return;
    const sessions = this.getSessions();
    const ipInfo = this.getClientIp();
    const uaInfo = parseUserAgent(navigator.userAgent);
    
    const newSession: SecuritySession = {
      id: `sess-${Date.now()}`,
      userEmail,
      userRole,
      ip: ipInfo.ip,
      city: ipInfo.city,
      country: ipInfo.country,
      userAgent: navigator.userAgent,
      os: uaInfo.os,
      browser: uaInfo.browser,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      token,
      isActive: true
    };
    
    localStorage.setItem("somadeiras_security_sessions", JSON.stringify([newSession, ...sessions]));
  }

  public static terminateSession(id: string) {
    if (typeof window === "undefined") return;
    const sessions = this.getSessions();
    const updated = sessions.map(s => s.id === id ? { ...s, isActive: false } : s);
    localStorage.setItem("somadeiras_security_sessions", JSON.stringify(updated));
    this.addLog("Exclusão de Sessão", "Admin", `Sessão ${id} encerrada remotamente.`, "Medium");
  }

  public static getBlockedIps(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const blocked = localStorage.getItem("somadeiras_blocked_ips");
      return blocked ? JSON.parse(blocked) : [];
    } catch { return []; }
  }

  public static blockIp(ip: string) {
    if (typeof window === "undefined") return;
    const blocked = this.getBlockedIps();
    if (!blocked.includes(ip)) {
      const updated = [...blocked, ip];
      localStorage.setItem("somadeiras_blocked_ips", JSON.stringify(updated));
      this.addLog("Bloqueio de IP", "Firewall", `IP ${ip} foi bloqueado automaticamente por atividade hostil.`, "High");
      this.addIncident("IP Bloqueado", `O IP ${ip} atingiu o limite de ameaça e foi bloqueado pelo Firewall Interno.`, "High");
    }
  }

  public static unblockIp(ip: string) {
    if (typeof window === "undefined") return;
    const blocked = this.getBlockedIps();
    const updated = blocked.filter(i => i !== ip);
    localStorage.setItem("somadeiras_blocked_ips", JSON.stringify(updated));
    this.addLog("Desbloqueio de IP", "Admin", `IP ${ip} foi desbloqueado manualmente pelo painel.`, "Low");
  }

  public static getThreatScore(): number {
    if (typeof window === "undefined") return 0;
    const score = sessionStorage.getItem("somadeiras_current_threat_score");
    return score ? parseInt(score, 10) : 0;
  }

  public static incrementThreatScore(points: number, attackType: string, reason: string) {
    if (typeof window === "undefined") return;
    const current = this.getThreatScore();
    const updated = current + points;
    sessionStorage.setItem("somadeiras_current_threat_score", updated.toString());

    const ipInfo = this.getClientIp();
    const uaInfo = parseUserAgent(navigator.userAgent);
    const fingerprint = sessionStorage.getItem("somadeiras_device_fp") || "unknown";

    // Add alert
    this.addAlert({
      ip: ipInfo.ip,
      city: ipInfo.city,
      country: ipInfo.country,
      userAgent: navigator.userAgent,
      os: uaInfo.os,
      browser: uaInfo.browser,
      fingerprint,
      endpoint: location.pathname + location.search,
      user: localStorage.getItem("somadeiras_logged_in_client") ? JSON.parse(localStorage.getItem("somadeiras_logged_in_client")!).email : "Visitante",
      sessionToken: sessionStorage.getItem("somadeiras_session_token") || "sess-anonymous",
      riskLevel: points >= 80 ? "Critical" : points >= 50 ? "High" : "Medium",
      actionTaken: updated >= 150 ? "IP_BLOCK" : "ALERT_LOGGED",
      attackType
    });

    this.addLog("Incidente de Segurança", "SecurityEngine", `Ameaça detectada: ${attackType}. Motivo: ${reason}. +${points} pontos. Total: ${updated}`, "High");

    // Automatically enforce blocks if limits are reached
    if (updated >= 150) {
      this.blockIp(ipInfo.ip);
    }
  }

  public static getConfig(): SecurityConfig {
    if (typeof window === "undefined") return DEFAULT_SECURITY_CONFIG;
    try {
      const config = localStorage.getItem("somadeiras_security_config");
      return config ? JSON.parse(config) : DEFAULT_SECURITY_CONFIG;
    } catch { return DEFAULT_SECURITY_CONFIG; }
  }

  public static saveConfig(config: SecurityConfig) {
    if (typeof window === "undefined") return;
    localStorage.setItem("somadeiras_security_config", JSON.stringify(config));
    this.addLog("Mudança Administrativa", "Admin", "Configurações de segurança atualizadas.", "Medium");
  }
}
