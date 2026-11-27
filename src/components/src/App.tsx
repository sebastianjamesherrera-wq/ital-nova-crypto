import { useState } from "react";

const telegramUrl = "https://t.me/ItalNovaCrypto";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ITAL NOVA CRYPTO home">
          <span className="brand-mark">IN</span>
          <span>ITAL NOVA <b>CRYPTO</b></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>☰</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#learn" onClick={() => setMenuOpen(false)}>Learn</a>
          <a href="#risk" onClick={() => setMenuOpen(false)}>Risk awareness</a>
          <a className="nav-cta" href={telegramUrl} target="_blank" rel="noreferrer">Join community ↗</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow" />
        <div className="eyebrow"><span className="pulse" /> DIGITAL ASSETS · KNOWLEDGE · COMMUNITY</div>
        <h1>Explore the future<br />of <span>digital finance.</span></h1>
        <p className="hero-copy">A community for people curious about cryptocurrency, blockchain technology, and the fast-changing digital asset ecosystem.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={telegramUrl} target="_blank" rel="noreferrer">Join our Telegram <span>↗</span></a>
          <a className="button button-secondary" href="#about">Discover ITAL NOVA <span>↓</span></a>
        </div>
        <div className="hero-note"><span>01 / OPEN COMMUNITY</span><span>Learn at your own pace. Make informed decisions.</span></div>
      </section>

      <section className="section intro" id="about">
        <div className="section-label">01 — ABOUT US</div>
        <div>
          <h2>Clarity in a world<br />that never <span>stands still.</span></h2>
          <p>ITAL NOVA CRYPTO is focused on making the digital asset space easier to explore. We believe good decisions begin with understanding, independent research, and an honest view of risk.</p>
        </div>
      </section>

      <section className="section learn-section" id="learn">
        <div className="section-label">02 — EXPLORE</div>
        <div className="learn-content">
          <h2>Build your<br /><span>understanding.</span></h2>
          <div className="feature-grid">
            <article className="feature-card"><span className="feature-number">01</span><div className="feature-icon">⌘</div><h3>Blockchain basics</h3><p>Understand how distributed networks, wallets, and transactions work.</p></article>
            <article className="feature-card"><span className="feature-number">02</span><div className="feature-icon">◇</div><h3>Digital assets</h3><p>Explore crypto assets and the technology and ideas behind them.</p></article>
            <article className="feature-card"><span className="feature-number">03</span><div className="feature-icon">↗</div><h3>Market awareness</h3><p>Learn to approach market information with context and critical thinking.</p></article>
          </div>
        </div>
      </section>

      <section className="risk-section" id="risk">
        <div className="risk-symbol">!</div>
        <div><div className="section-label">IMPORTANT — PLEASE READ</div><h2>Knowledge first.<br /><span>Risk always matters.</span></h2><p>Cryptocurrency is volatile and can result in the loss of some or all of your money. Content on this website is for general information and education only, not financial, investment, or trading advice. No returns or profits are guaranteed. Always do your own research and consider seeking independent professional advice.</p></div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home"><span className="brand-mark">IN</span><span>ITAL NOVA <b>CRYPTO</b></span></a>
        <span className="footer-copy">© {new Date().getFullYear()} ITAL NOVA CRYPTO. All rights reserved.</span>
        <a className="footer-link" href={telegramUrl} target="_blank" rel="noreferrer">Telegram community ↗</a>
      </footer>
    </main>
  );
}
