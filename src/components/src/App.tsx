import { useState, type ReactNode } from "react";

const telegramUrl = "https://t.me/ItalNovaCrypto";

const translations = {
  it: {
    language: "Lingua", nav: ["Cosa Offriamo", "Canale", "FAQ"], join: "Unisciti su Telegram 🚀",
    pill: "Community Crypto Italiana", free: "100% Gratuita",
    hero: "Il tuo punto di riferimento per Bitcoin, Mercati e Formazione Crypto",
    intro: "📊 Notizie crypto, aggiornamenti su Bitcoin, analisi di mercato e formazione per comprendere il mondo degli asset digitali con maggiore consapevolezza.",
    enter: "Entra nel Canale Telegram", discover: "Scopri i Contenuti", tagline: "INFORMAZIONE · ANALISI · FORMAZIONE",
    world: "IL NOSTRO MONDO", featuresTitle: "Tutto ciò che trovi su ITALNOVA CRYPTO", featuresIntro: "Informazioni selezionate per aiutarti a orientarti nel panorama delle criptovalute.",
    features: [
      ["Notizie Crypto", "Le news più importanti dal mondo blockchain, regolamentazioni e adozione istituzionale tradotte e spiegate in italiano."],
      ["Aggiornamenti Bitcoin", "Monitoraggio costante su BTC, livelli chiave di prezzo, dati on-chain e movimenti macroeconomici rilevanti."],
      ["Analisi di Mercato", "Struttura dei mercati, trend delle principali altcoin e scenari di mercato raccontati con chiarezza e obiettività."],
      ["Formazione", "Guide pratiche, gestione del rischio, sicurezza dei wallet e basi fondamentali per principianti ed esperti."]
    ],
    channel: "Canale Ufficiale", open: "Apri su Telegram", btc: "IL MONDO BITCOIN", btcTitle: "Aggiornamenti e analisi", btcText: "Approfondimenti sul mercato Bitcoin, dati e temi che aiutano a comprendere i movimenti del settore.",
    edu: "FORMAZIONE CRYPTO", eduTitle: "Impara, comprendi, approfondisci", eduText: "Contenuti educativi, guide e concetti chiave del mondo blockchain spiegati in modo accessibile.",
    official: "COMMUNITY UFFICIALE", community: "Unisciti alla community",
    questions: "HAI DELLE DOMANDE?", faqTitle: "Domande Frequenti", faqIntro: "Le informazioni essenziali sulla nostra community.",
    faqs: [
      ["L'accesso al canale Telegram è gratuito?", "Sì, l'accesso a ITALNOVA CRYPTO su Telegram è completamente gratuito. Ti basta cliccare sul pulsante per unirti subito."],
      ["È adatto anche a chi parte da zero?", "Assolutamente sì. Pubblichiamo contenuti formativi chiari per comprendere le basi di Bitcoin, blockchain e gestione del rischio."],
      ["Fornite consulenza finanziaria?", "No. Tutti i contenuti hanno scopo esclusivamente informativo ed educativo. Fai sempre le tue ricerche (DYOR) prima di investire."]
    ],
    stay: "RESTA CONNESSO", finalTitle: "Pronto a restare un passo avanti nel mondo crypto?", finalText: "Unisciti alla community italiana di ITALNOVA CRYPTO su Telegram.",
    finalJoin: "Unisciti a ITALNOVA CRYPTO 🚀", rights: "Tutti i diritti riservati.", telegram: "Canale Telegram",
    disclaimer: "Disclaimer: I contenuti pubblicati su ITALNOVA CRYPTO hanno finalità esclusivamente informative ed educative e non costituiscono consulenza finanziaria o sollecitazione all'investimento."
  },
  en: {
    language: "Language", nav: ["What We Offer", "Community", "FAQ"], join: "Join us on Telegram 🚀",
    pill: "Italian Crypto Community", free: "100% Free",
    hero: "Your trusted destination for Bitcoin, Markets and Crypto Education",
    intro: "📊 Crypto news, Bitcoin updates, market analysis and education to help you understand the world of digital assets with greater confidence.",
    enter: "Join the Telegram Channel", discover: "Explore Our Content", tagline: "INFORMATION · ANALYSIS · EDUCATION",
    world: "OUR WORLD", featuresTitle: "Discover ITALNOVA CRYPTO", featuresIntro: "Selected insights to help you navigate the cryptocurrency landscape.",
    features: [
      ["Crypto News", "Important news from blockchain, regulation and institutional adoption, explained clearly."],
      ["Bitcoin Updates", "Ongoing coverage of BTC, key price levels, on-chain data and relevant macroeconomic moves."],
      ["Market Analysis", "Market structure, leading altcoin trends and market scenarios explained clearly and objectively."],
      ["Education", "Practical guides, risk awareness, wallet security and essential concepts for beginners and experienced users."]
    ],
    channel: "Official Channel", open: "Open on Telegram", btc: "THE WORLD OF BITCOIN", btcTitle: "Updates and Analysis", btcText: "Insights into the Bitcoin market, data and themes that help explain sector movements.",
    edu: "CRYPTO EDUCATION", eduTitle: "Learn, Understand, Explore", eduText: "Educational content, guides and key blockchain concepts explained in an accessible way.",
    official: "OFFICIAL COMMUNITY", community: "Join the Community",
    questions: "HAVE QUESTIONS?", faqTitle: "Frequently Asked Questions", faqIntro: "Essential information about our community.",
    faqs: [
      ["Is the Telegram channel free?", "Yes, joining ITALNOVA CRYPTO on Telegram is completely free. Simply click the button to join."],
      ["Is it suitable for complete beginners?", "Absolutely. We publish clear educational content covering the basics of Bitcoin, blockchain and risk awareness."],
      ["Do you provide financial advice?", "No. All content is for informational and educational purposes only and is not financial advice. Always do your own research (DYOR)."]
    ],
    stay: "STAY CONNECTED", finalTitle: "Ready to stay one step ahead in crypto?", finalText: "Join the ITALNOVA CRYPTO community on Telegram.",
    finalJoin: "Join ITALNOVA CRYPTO 🚀", rights: "All rights reserved.", telegram: "Telegram Channel",
    disclaimer: "Disclaimer: Content published by ITALNOVA CRYPTO is for informational and educational purposes only and does not constitute financial advice or a solicitation to invest."
  },
  fr: {
    language: "Langue", nav: ["Nos services", "Communauté", "FAQ"], join: "Rejoignez-nous sur Telegram 🚀",
    pill: "Communauté crypto italienne", free: "100 % gratuit",
    hero: "Votre référence pour Bitcoin, les marchés et la formation crypto",
    intro: "📊 Actualités crypto, mises à jour Bitcoin, analyses de marché et formations pour mieux comprendre les actifs numériques.",
    enter: "Rejoindre le canal Telegram", discover: "Découvrir nos contenus", tagline: "INFORMATION · ANALYSE · FORMATION",
    world: "NOTRE UNIVERS", featuresTitle: "Découvrez ITALNOVA CRYPTO", featuresIntro: "Des informations sélectionnées pour vous guider dans l'univers des cryptomonnaies.",
    features: [
      ["Actualités crypto", "Les principales actualités de la blockchain, de la réglementation et de l'adoption institutionnelle, expliquées clairement."],
      ["Actualités Bitcoin", "Suivi du BTC, niveaux de prix clés, données on-chain et mouvements macroéconomiques importants."],
      ["Analyse du marché", "Structure des marchés, tendances des principales altcoins et scénarios expliqués avec clarté et objectivité."],
      ["Formation", "Guides pratiques, sensibilisation aux risques, sécurité des portefeuilles et notions essentielles pour tous."]
    ],
    channel: "Canal officiel", open: "Ouvrir sur Telegram", btc: "L'UNIVERS BITCOIN", btcTitle: "Actualités et analyses", btcText: "Des analyses du marché Bitcoin et des données pour mieux comprendre les mouvements du secteur.",
    edu: "FORMATION CRYPTO", eduTitle: "Apprendre, comprendre, approfondir", eduText: "Des contenus éducatifs, des guides et les concepts clés de la blockchain expliqués simplement.",
    official: "COMMUNAUTÉ OFFICIELLE", community: "Rejoindre la communauté",
    questions: "DES QUESTIONS ?", faqTitle: "Questions fréquentes", faqIntro: "Les informations essentielles sur notre communauté.",
    faqs: [
      ["L'accès au canal Telegram est-il gratuit ?", "Oui, l'accès à ITALNOVA CRYPTO sur Telegram est entièrement gratuit. Cliquez simplement sur le bouton pour nous rejoindre."],
      ["Est-ce adapté aux débutants ?", "Bien sûr. Nous publions des contenus pédagogiques clairs sur les bases du Bitcoin, de la blockchain et la sensibilisation aux risques."],
      ["Fournissez-vous des conseils financiers ?", "Non. Nos contenus sont uniquement informatifs et éducatifs et ne constituent pas un conseil financier. Faites toujours vos propres recherches."]
    ],
    stay: "RESTEZ CONNECTÉ", finalTitle: "Prêt à garder une longueur d'avance dans la crypto ?", finalText: "Rejoignez la communauté ITALNOVA CRYPTO sur Telegram.",
    finalJoin: "Rejoindre ITALNOVA CRYPTO 🚀", rights: "Tous droits réservés.", telegram: "Canal Telegram",
    disclaimer: "Avertissement : les contenus d'ITALNOVA CRYPTO sont uniquement informatifs et éducatifs et ne constituent pas un conseil financier ni une incitation à investir."
  },
  es: {
    language: "Idioma", nav: ["Qué ofrecemos", "Comunidad", "FAQ"], join: "Únete en Telegram 🚀",
    pill: "Comunidad cripto italiana", free: "100 % gratis",
    hero: "Tu punto de referencia para Bitcoin, mercados y formación cripto",
    intro: "📊 Noticias cripto, novedades de Bitcoin, análisis de mercado y formación para comprender mejor los activos digitales.",
    enter: "Entrar al canal de Telegram", discover: "Descubre el contenido", tagline: "INFORMACIÓN · ANÁLISIS · FORMACIÓN",
    world: "NUESTRO MUNDO", featuresTitle: "Descubre ITALNOVA CRYPTO", featuresIntro: "Información seleccionada para orientarte en el panorama de las criptomonedas.",
    features: [
      ["Noticias cripto", "Las noticias más importantes sobre blockchain, regulación y adopción institucional, explicadas con claridad."],
      ["Actualizaciones de Bitcoin", "Seguimiento de BTC, niveles clave de precios, datos on-chain y movimientos macroeconómicos relevantes."],
      ["Análisis de mercado", "Estructura del mercado, tendencias de las principales altcoins y escenarios explicados con objetividad."],
      ["Formación", "Guías prácticas, conciencia del riesgo, seguridad de wallets y conceptos esenciales para todos."]
    ],
    channel: "Canal oficial", open: "Abrir en Telegram", btc: "EL MUNDO BITCOIN", btcTitle: "Novedades y análisis", btcText: "Análisis del mercado Bitcoin y datos para comprender mejor los movimientos del sector.",
    edu: "FORMACIÓN CRIPTO", eduTitle: "Aprende, comprende, profundiza", eduText: "Contenido educativo, guías y conceptos clave de blockchain explicados de forma accesible.",
    official: "COMUNIDAD OFICIAL", community: "Únete a la comunidad",
    questions: "¿TIENES PREGUNTAS?", faqTitle: "Preguntas frecuentes", faqIntro: "Información esencial sobre nuestra comunidad.",
    faqs: [
      ["¿Es gratuito el canal de Telegram?", "Sí, unirse a ITALNOVA CRYPTO en Telegram es totalmente gratis. Solo tienes que pulsar el botón para entrar."],
      ["¿Es adecuado para principiantes?", "Por supuesto. Publicamos contenido educativo claro sobre Bitcoin, blockchain y conciencia del riesgo."],
      ["¿Ofrecéis asesoramiento financiero?", "No. Todo el contenido es exclusivamente informativo y educativo y no constituye asesoramiento financiero. Investiga siempre por tu cuenta."]
    ],
    stay: "MANTENTE CONECTADO", finalTitle: "¿Listo para estar un paso adelante en el mundo cripto?", finalText: "Únete a la comunidad ITALNOVA CRYPTO en Telegram.",
    finalJoin: "Únete a ITALNOVA CRYPTO 🚀", rights: "Todos los derechos reservados.", telegram: "Canal de Telegram",
    disclaimer: "Aviso: el contenido de ITALNOVA CRYPTO tiene fines exclusivamente informativos y educativos y no constituye asesoramiento financiero ni una invitación a invertir."
  },
  de: {
    language: "Sprache", nav: ["Unser Angebot", "Community", "FAQ"], join: "Auf Telegram beitreten 🚀",
    pill: "Italienische Krypto-Community", free: "100 % kostenlos",
    hero: "Ihre Anlaufstelle für Bitcoin, Märkte und Krypto-Bildung",
    intro: "📊 Krypto-Nachrichten, Bitcoin-Updates, Marktanalysen und Bildung, damit Sie digitale Vermögenswerte besser verstehen.",
    enter: "Telegram-Kanal beitreten", discover: "Inhalte entdecken", tagline: "INFORMATION · ANALYSE · BILDUNG",
    world: "UNSERE WELT", featuresTitle: "Entdecken Sie ITALNOVA CRYPTO", featuresIntro: "Ausgewählte Informationen zur Orientierung in der Welt der Kryptowährungen.",
    features: [
      ["Krypto-Nachrichten", "Wichtige Nachrichten zu Blockchain, Regulierung und institutioneller Akzeptanz, verständlich erklärt."],
      ["Bitcoin-Updates", "Laufende Beobachtung von BTC, wichtigen Kursniveaus, On-Chain-Daten und relevanten makroökonomischen Bewegungen."],
      ["Marktanalyse", "Marktstruktur, Trends führender Altcoins und Marktszenarien klar und objektiv erklärt."],
      ["Bildung", "Praktische Leitfäden, Risikobewusstsein, Wallet-Sicherheit und Grundlagen für Einsteiger und Fortgeschrittene."]
    ],
    channel: "Offizieller Kanal", open: "Auf Telegram öffnen", btc: "DIE WELT VON BITCOIN", btcTitle: "Updates und Analysen", btcText: "Einblicke in den Bitcoin-Markt und Daten, die helfen, Marktbewegungen zu verstehen.",
    edu: "KRYPTO-BILDUNG", eduTitle: "Lernen, verstehen, vertiefen", eduText: "Bildungsinhalte, Leitfäden und wichtige Blockchain-Konzepte verständlich erklärt.",
    official: "OFFIZIELLE COMMUNITY", community: "Community beitreten",
    questions: "NOCH FRAGEN?", faqTitle: "Häufig gestellte Fragen", faqIntro: "Wichtige Informationen über unsere Community.",
    faqs: [
      ["Ist der Telegram-Kanal kostenlos?", "Ja, der Zugang zu ITALNOVA CRYPTO auf Telegram ist vollständig kostenlos. Klicken Sie einfach auf die Schaltfläche, um beizutreten."],
      ["Ist das Angebot für Anfänger geeignet?", "Auf jeden Fall. Wir veröffentlichen verständliche Bildungsinhalte zu Bitcoin, Blockchain und Risikobewusstsein."],
      ["Bieten Sie Finanzberatung an?", "Nein. Alle Inhalte dienen ausschließlich Informations- und Bildungszwecken und sind keine Finanzberatung. Recherchieren Sie immer selbst."]
    ],
    stay: "BLEIBEN SIE VERBUNDEN", finalTitle: "Bereit, der Krypto-Welt einen Schritt voraus zu sein?", finalText: "Werden Sie Teil der ITALNOVA CRYPTO Community auf Telegram.",
    finalJoin: "ITALNOVA CRYPTO beitreten 🚀", rights: "Alle Rechte vorbehalten.", telegram: "Telegram-Kanal",
    disclaimer: "Haftungsausschluss: Die Inhalte von ITALNOVA CRYPTO dienen ausschließlich Informations- und Bildungszwecken und stellen weder Finanzberatung noch eine Anlageaufforderung dar."
  }
} as const;

type Language = keyof typeof translations;
const languageNames: Record<Language, string> = { it: "🇮🇹 Italiano", en: "🇬🇧 English", fr: "🇫🇷 Français", es: "🇪🇸 Español", de: "🇩🇪 Deutsch" };

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "it";
  const saved = localStorage.getItem("italnova-language");
  if (saved && saved in translations) return saved as Language;
  const browserLanguage = (navigator.languages?.[0] || navigator.language || "it").slice(0, 2).toLowerCase();
  return browserLanguage in translations ? browserLanguage as Language : "en";
}

function TelegramButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <a className={className} href={telegramUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(detectLanguage);
  const t = translations[language];

  function changeLanguage(next: string) {
    if (next in translations) {
      const selected = next as Language;
      setLanguage(selected);
      localStorage.setItem("italnova-language", selected);
      document.documentElement.lang = selected;
    }
  }

  return (
    <main id="inizio">
      <header className="site-header">
        <div className="header-inner">
          <a href="#inizio" className="brand" aria-label="ITALNOVA CRYPTO home"><span className="flag">🇮🇹</span><span>ITALNOVA <b>CRYPTO</b></span></a>
          <div className="language-picker"><label htmlFor="site-language">🌐 <span>{t.language}</span></label><select id="site-language" value={language} onChange={e => changeLanguage(e.target.value)} aria-label={t.language}>{Object.entries(languageNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></div>
          <button className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
            <a href="#funzionalita" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
            <a href="#anteprima" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
          </nav>
          <TelegramButton className="header-cta">{t.join}</TelegramButton>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="hero-grid" />
        <div className="hero-content">
          <div className="community-pill"><span className="pulse-dot" /> {t.pill} <i /> {t.free}</div>
          <h1>{t.hero.split(/(Bitcoin|Mercati|Markets|marchés|mercados|Märkte)/i).map((part, i) => /^(Bitcoin|Mercati|Markets|marchés|mercados|Märkte)$/i.test(part) ? <span key={i}>{part}</span> : part)}</h1>
          <p>{t.intro}</p>
          <div className="hero-actions"><TelegramButton className="primary-cta">{t.enter} <span>→</span></TelegramButton><a className="secondary-cta" href="#funzionalita">{t.discover}</a></div>
          <div className="hero-note"><span>ITALNOVA CRYPTO</span><span>{t.tagline}</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner" /><div className="bitcoin-core">₿</div><div className="floating-coin coin-one">₿</div><div className="floating-coin coin-two">◆</div><div className="floating-coin coin-three">◎</div><div className="art-caption">DIGITAL ASSET INTELLIGENCE <span>●</span></div></div>
      </section>

      <section className="features-section" id="funzionalita">
        <div className="section-intro"><span className="eyebrow">{t.world}</span><h2>{t.featuresTitle}</h2><p>{t.featuresIntro}</p></div>
        <div className="features-grid">{t.features.map((feature, index) => <article className={`feature-card ${["green", "gold", "blue", "purple"][index]}`} key={feature[0]}><div className="feature-icon">{["📰", "₿", "📊", "🎓"][index]}</div><h3>{feature[0]}</h3><p>{feature[1]}</p><span className="card-line" /></article>)}</div>
      </section>

      <section className="telegram-section" id="anteprima">
        <div className="telegram-card">
          <div className="telegram-top"><div className="telegram-identity"><div className="telegram-avatar">IN</div><div><h3>🇮🇹 ITALNOVA CRYPTO 🚀</h3><p>@ItalNovaCrypto · {t.channel}</p></div></div><TelegramButton className="telegram-open">{t.open} ↗</TelegramButton></div>
          <div className="telegram-message"><div className="message-mark">₿</div><div><span className="message-label gold-label">{t.btc}</span><h4>{t.btcTitle}</h4><p>{t.btcText}</p></div></div>
          <div className="telegram-message"><div className="message-mark education-mark">✦</div><div><span className="message-label green-label">{t.edu}</span><h4>{t.eduTitle}</h4><p>{t.eduText}</p></div></div>
          <div className="telegram-bottom"><span><i className="pulse-dot" /> {t.official}</span><TelegramButton>{t.community} →</TelegramButton></div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-intro"><span className="eyebrow">{t.questions}</span><h2>{t.faqTitle}</h2><p>{t.faqIntro}</p></div>
        <div className="faq-list">{t.faqs.map((faq, index) => <details className="faq-item" key={faq[0]}><summary><span className="faq-number">0{index + 1}</span>{faq[0]}<span className="faq-plus">+</span></summary><p>{faq[1]}</p></details>)}</div>
      </section>

      <section className="final-cta"><div className="cta-glow" /><span className="eyebrow">{t.stay}</span><h2>{t.finalTitle}</h2><p>{t.finalText}</p><TelegramButton className="primary-cta">{t.finalJoin} <span>↗</span></TelegramButton></section>

      <footer className="site-footer"><a href="#inizio" className="brand"><span className="flag">🇮🇹</span><span>ITALNOVA <b>CRYPTO</b></span></a><p>© {new Date().getFullYear()} ITALNOVA CRYPTO. {t.rights}</p><TelegramButton className="footer-link">{t.telegram} ↗</TelegramButton><p className="disclaimer">{t.disclaimer}</p></footer>
    </main>
  );
}
