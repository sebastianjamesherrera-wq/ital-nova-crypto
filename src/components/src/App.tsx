import { useState, type ReactNode } from "react";

const telegramUrl = "https://t.me/ItalNovaCrypto";

const features = [
  { icon: "📰", title: "Notizie Crypto", tone: "green", text: "Le news più importanti dal mondo blockchain, regolamentazioni e adozione istituzionale tradotte e spiegate in italiano." },
  { icon: "₿", title: "Aggiornamenti Bitcoin", tone: "gold", text: "Monitoraggio costante su BTC, livelli chiave di prezzo, dati on-chain e movimenti macroeconomici rilevanti." },
  { icon: "📊", title: "Analisi di Mercato", tone: "blue", text: "Struttura dei mercati, trend delle principali altcoin e scenari di mercato raccontati con chiarezza e obiettività." },
  { icon: "🎓", title: "Formazione", tone: "purple", text: "Guide pratiche, gestione del rischio, sicurezza dei wallet e basi fondamentali per principianti ed esperti." },
];

const faqs = [
  { q: "L'accesso al canale Telegram è gratuito?", a: "Sì, l'accesso a ITALNOVA CRYPTO su Telegram è completamente gratuito. Ti basta cliccare sul pulsante per unirti subito." },
  { q: "È adatto anche a chi parte da zero?", a: "Assolutamente sì. Pubblichiamo contenuti formativi chiari per comprendere le basi di Bitcoin, blockchain e gestione del rischio." },
  { q: "Fornite consulenza finanziaria?", a: "No. Tutti i contenuti hanno scopo esclusivamente informativo ed educativo. Fai sempre le tue ricerche (DYOR) prima di investire." },
];

function TelegramButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <a className={className} href={telegramUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="inizio">
      <header className="site-header">
        <div className="header-inner">
          <a href="#inizio" className="brand" aria-label="ITALNOVA CRYPTO home"><span className="flag">🇮🇹</span><span>ITALNOVA <b>CRYPTO</b></span></a>
          <button className="menu-toggle" aria-label="Apri menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navigazione principale">
            <a href="#funzionalita" onClick={() => setMenuOpen(false)}>Cosa Offriamo</a>
            <a href="#anteprima" onClick={() => setMenuOpen(false)}>Canale</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          </nav>
          <TelegramButton className="header-cta">Unisciti su Telegram 🚀</TelegramButton>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="community-pill"><span className="pulse-dot" /> Community Crypto Italiana <i /> 100% Gratuita</div>
          <h1>Il tuo punto di riferimento per <span>Bitcoin</span>, Mercati e Formazione Crypto</h1>
          <p>📊 Notizie crypto, aggiornamenti su Bitcoin, analisi di mercato e formazione per comprendere il mondo degli asset digitali con maggiore consapevolezza.</p>
          <div className="hero-actions">
            <TelegramButton className="primary-cta">Entra nel Canale Telegram <span>→</span></TelegramButton>
            <a className="secondary-cta" href="#funzionalita">Scopri i Contenuti</a>
          </div>
          <div className="hero-note"><span>ITALNOVA CRYPTO</span><span>INFORMAZIONE · ANALISI · FORMAZIONE</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner" />
          <div className="bitcoin-core">₿</div><div className="floating-coin coin-one">₿</div><div className="floating-coin coin-two">◆</div><div className="floating-coin coin-three">◎</div>
          <div className="art-caption">DIGITAL ASSET INTELLIGENCE <span>●</span></div>
        </div>
      </section>

      <section className="features-section" id="funzionalita">
        <div className="section-intro">
          <span className="eyebrow">IL NOSTRO MONDO</span>
          <h2>Tutto ciò che trovi su <span>ITALNOVA CRYPTO</span></h2>
          <p>Informazioni selezionate per aiutarti a orientarti nel panorama delle criptovalute.</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => <article className={`feature-card ${feature.tone}`} key={feature.title}>
            <div className="feature-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p><span className="card-line" />
          </article>)}
        </div>
      </section>

      <section className="telegram-section" id="anteprima">
        <div className="telegram-card">
          <div className="telegram-top">
            <div className="telegram-identity"><div className="telegram-avatar">IN</div><div><h3>🇮🇹 ITALNOVA CRYPTO 🚀</h3><p>@ItalNovaCrypto · Canale Ufficiale</p></div></div>
            <TelegramButton className="telegram-open">Apri su Telegram ↗</TelegramButton>
          </div>
          <div className="telegram-message">
            <div className="message-mark">₿</div><div><span className="message-label gold-label">IL MONDO BITCOIN</span><h4>Aggiornamenti e analisi</h4><p>Approfondimenti sul mercato Bitcoin, dati e temi che aiutano a comprendere i movimenti del settore.</p></div>
          </div>
          <div className="telegram-message">
            <div className="message-mark education-mark">✦</div><div><span className="message-label green-label">FORMAZIONE CRYPTO</span><h4>Impara, comprendi, approfondisci</h4><p>Contenuti educativi, guide e concetti chiave del mondo blockchain spiegati in modo accessibile.</p></div>
          </div>
          <div className="telegram-bottom"><span><i className="pulse-dot" /> COMMUNITY UFFICIALE</span><TelegramButton>Unisciti alla community →</TelegramButton></div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-intro"><span className="eyebrow">HAI DELLE DOMANDE?</span><h2>Domande <span>Frequenti</span></h2><p>Le informazioni essenziali sulla nostra community.</p></div>
        <div className="faq-list">{faqs.map((faq, index) => <details className="faq-item" key={faq.q}><summary><span className="faq-number">0{index + 1}</span>{faq.q}<span className="faq-plus">+</span></summary><p>{faq.a}</p></details>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" /><span className="eyebrow">RESTA CONNESSO</span>
        <h2>Pronto a restare un passo avanti nel <span>mondo crypto?</span></h2>
        <p>Unisciti alla community italiana di ITALNOVA CRYPTO su Telegram.</p>
        <TelegramButton className="primary-cta">Unisciti a ITALNOVA CRYPTO 🚀 <span>↗</span></TelegramButton>
      </section>

      <footer className="site-footer">
        <a href="#inizio" className="brand"><span className="flag">🇮🇹</span><span>ITALNOVA <b>CRYPTO</b></span></a>
        <p>© {new Date().getFullYear()} ITALNOVA CRYPTO. Tutti i diritti riservati.</p>
        <TelegramButton className="footer-link">Canale Telegram ↗</TelegramButton>
        <p className="disclaimer">Disclaimer: I contenuti pubblicati su ITALNOVA CRYPTO hanno finalità esclusivamente informative ed educative e non costituiscono consulenza finanziaria o sollecitazione all'investimento.</p>
      </footer>
    </main>
  );
}
