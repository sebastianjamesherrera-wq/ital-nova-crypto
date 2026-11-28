import { useEffect, useMemo, useState } from "react";

const API = "https://api.coingecko.com/api/v3";
const telegramUrl = "https://t.me/ItalNovaCrypto";
type Coin = { id: string; symbol: string; name: string; image: string; current_price: number; market_cap: number; market_cap_rank: number; total_volume: number; high_24h: number; low_24h: number; price_change_percentage_24h: number; sparkline_in_7d?: { price: number[] } };
type Point = [number, number];
const ranges = [{ label: "24H", days: "1" }, { label: "7D", days: "7" }, { label: "1M", days: "30" }, { label: "1Y", days: "365" }];
const money = (n?: number) => n == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 1 ? 6 : 2 }).format(n);
const compact = (n?: number) => n == null ? "—" : new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
const pct = (n?: number) => n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

function LineChart({ points }: { points: Point[] }) {
  if (!points.length) return <div className="chart-empty">Waiting for market chart data…</div>;
  const values = points.map(p => p[1]), min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const coords = values.map((v, i) => [i / Math.max(values.length - 1, 1) * 1000, 190 - (v - min) / span * 165]);
  const path = coords.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const positive = values[values.length - 1] >= values[0];
  return <svg className="chart-svg" viewBox="0 0 1000 210" preserveAspectRatio="none" role="img" aria-label="Selected cryptocurrency price history">
    <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={positive ? "#d8b66a" : "#ff7777"} stopOpacity=".24"/><stop offset="100%" stopColor={positive ? "#d8b66a" : "#ff7777"} stopOpacity="0"/></linearGradient></defs>
    {[45, 95, 145, 195].map(y => <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeDasharray="4 8"/>)}
    <path d={`${path} L 1000 210 L 0 210 Z`} fill="url(#chartFill)"/>
    <path d={path} fill="none" stroke={positive ? "#d8b66a" : "#ff7777"} strokeWidth="3" vectorEffect="non-scaling-stroke"/>
  </svg>;
}

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selected, setSelected] = useState("bitcoin"), [days, setDays] = useState("1"), [points, setPoints] = useState<Point[]>([]);
  const [query, setQuery] = useState(""), [loading, setLoading] = useState(true), [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState(""), [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [global, setGlobal] = useState<{ total_market_cap?: { usd: number }; total_volume?: { usd: number }; market_cap_change_percentage_24h_usd?: number; active_cryptocurrencies?: number } | null>(null);
  const active = coins.find(c => c.id === selected) || coins[0];
  const filtered = useMemo(() => coins.filter(c => `${c.name} ${c.symbol}`.toLowerCase().includes(query.toLowerCase())), [coins, query]);
  const gainers = useMemo(() => [...coins].filter(c => Number.isFinite(c.price_change_percentage_24h)).sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0,5), [coins]);
  const decliners = useMemo(() => [...coins].filter(c => Number.isFinite(c.price_change_percentage_24h)).sort((a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0,5), [coins]);
  const advancing = coins.filter(c => (c.price_change_percentage_24h || 0) > 0).length;
  const declining = coins.filter(c => (c.price_change_percentage_24h || 0) < 0).length;

  async function loadMarkets() {
    try {
      const [marketRes, globalRes] = await Promise.all([
        fetch(`${API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`),
        fetch(`${API}/global`)
      ]);
      if (!marketRes.ok) throw new Error("Live market data is temporarily unavailable. Please try again shortly.");
      const marketData = await marketRes.json(); setCoins(marketData);
      if (globalRes.ok) { const g = await globalRes.json(); setGlobal(g.data); }
      setLastUpdated(new Date()); setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load live market data."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadMarkets(); const timer = window.setInterval(loadMarkets, 60000); return () => window.clearInterval(timer); }, []);
  useEffect(() => {
    if (!active) return;
    let cancelled = false; setChartLoading(true);
    fetch(`${API}/coins/${active.id}/market_chart?vs_currency=usd&days=${days}`)
      .then(r => { if (!r.ok) throw new Error("Chart unavailable"); return r.json(); })
      .then(data => { if (!cancelled) setPoints(data.prices || []); })
      .catch(() => { if (!cancelled) setPoints([]); })
      .finally(() => { if (!cancelled) setChartLoading(false); });
    return () => { cancelled = true; };
  }, [active?.id, days]);

  return <main id="home">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-icon">IN</span><span>ITAL NOVA <b>CRYPTO</b></span></a>
      <nav><a href="#markets">Markets</a><a href="#insights">Insights</a><a href="#about">About</a></nav>
      <a className="community-link" href={telegramUrl} target="_blank" rel="noreferrer">Join community ↗</a>
    </header>
    <section className="hero">
      <div className="hero-content"><div className="eyebrow"><i/> THE NEXT PERSPECTIVE ON DIGITAL ASSETS</div>
        <h1>Move with the<br/><span>market, not the noise.</span></h1>
        <p>A global destination for cryptocurrency market intelligence. Explore live digital-asset prices, understand market movements and follow the data behind the headlines.</p>
        <a className="primary-btn" href="#markets">Explore the markets <span>↓</span></a>
      </div>
      <div className="hero-orbit"><div className="orbit-core">₿</div><span className="orbit-coin orbit-btc">₿</span><span className="orbit-coin orbit-eth">◆</span><span className="orbit-coin orbit-sol">◎</span></div>
      <div className="hero-foot"><span>MARKET DATA · COINGECKO</span><span>MARKET DATA · AUTOMATIC REFRESH</span></div>
    </section>
    <section className="market-strip" aria-label="Global market overview">
      <div><span>GLOBAL CRYPTO MARKET CAP</span><strong>{global ? money(global.total_market_cap?.usd) : "Loading…"}</strong></div>
      <div><span>24H MARKET VOLUME</span><strong>{global ? money(global.total_volume?.usd) : "Loading…"}</strong></div>
      <div><span>GLOBAL MARKET CHANGE</span><strong className={(global?.market_cap_change_percentage_24h_usd || 0) >= 0 ? "up" : "down"}>{pct(global?.market_cap_change_percentage_24h_usd)}</strong></div>
      <div><span>ACTIVE CRYPTOCURRENCIES</span><strong>{global ? compact(global.active_cryptocurrencies) : "Loading…"}</strong></div>
    </section>
    <section className="markets-section" id="markets">
      <div className="section-heading"><div><div className="eyebrow">01 / THE MARKET</div><h2>Every move, <span>in view.</span></h2><p>Explore market prices, performance and historical trends.</p></div>
        <div className="updated">{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Connecting to market data"}<span className="live-dot"/> <button onClick={loadMarkets} aria-label="Refresh market data">↻</button></div>
      </div>
      {error && <div className="error-banner">{error} <button onClick={loadMarkets}>Retry</button></div>}
      <div className="market-layout">
        <div className="table-panel"><div className="table-toolbar"><h3>Top cryptocurrencies</h3><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search assets…" aria-label="Search cryptocurrencies"/></div>
          <div className="table-scroll"><table><thead><tr><th>#</th><th>Asset</th><th>Price</th><th>24H</th><th>Volume (24H)</th><th>Market cap</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan={6} className="empty-cell">Loading live assets…</td></tr> : filtered.slice(0, 20).map((coin, i) => <tr key={coin.id} className={active?.id === coin.id ? "selected-row" : ""} onClick={() => setSelected(coin.id)} tabIndex={0} onKeyDown={e => e.key === "Enter" && setSelected(coin.id)}>
              <td className="rank">{coin.market_cap_rank || i + 1}</td><td><div className="asset-name"><img src={coin.image} alt=""/><span><b>{coin.name}</b><small>{coin.symbol.toUpperCase()}</small></span></div></td>
              <td className="price-cell">{money(coin.current_price)}</td><td className={(coin.price_change_percentage_24h || 0) >= 0 ? "up" : "down"}>{pct(coin.price_change_percentage_24h)}</td><td>{money(coin.total_volume)}</td><td>{money(coin.market_cap)}</td>
            </tr>)}</tbody></table></div>
          <div className="table-foot">Choose an asset to inspect its chart. Data refreshes every 60 seconds.</div>
        </div>
        <aside className="chart-panel"><div className="chart-head"><div><span>ASSET OVERVIEW</span><h3>{active ? <><img src={active.image} alt=""/>{active.name}</> : "Select an asset"}</h3></div>{active && <strong>{money(active.current_price)}</strong>}</div>
          {active && <div className="chart-change"><span className={(active.price_change_percentage_24h || 0) >= 0 ? "up" : "down"}>{pct(active.price_change_percentage_24h)} <small>24H</small></span><span>Market rank #{active.market_cap_rank}</span></div>}
          <div className="range-tabs">{ranges.map(r => <button key={r.days} className={days === r.days ? "range-active" : ""} onClick={() => setDays(r.days)}>{r.label}</button>)}</div>
          <div className="chart-wrap">{chartLoading ? <div className="chart-empty">Loading chart…</div> : <LineChart points={points}/>}</div>
          {active && <div className="chart-stats"><div><span>24H HIGH / LOW</span><b>{money(active.high_24h)} / {money(active.low_24h)}</b></div><div><span>24H VOLUME</span><b>{money(active.total_volume)}</b></div></div>}
          <p className="chart-note">Source: CoinGecko public market API. Historical market prices are informational, not a trading recommendation.</p>
        </aside>
      </div>
    </section>
    <section className="intelligence-section" aria-labelledby="intelligence-title">
      <div className="section-heading"><div><div className="eyebrow">02 / MARKET PULSE</div><h2 id="intelligence-title">Read the market.<br/><span>Beyond the headline.</span></h2><p>Live market breadth and the strongest 24-hour moves across the assets we track.</p></div><div className="pulse-status"><i/> BASED ON LIVE 24H DATA</div></div>
      <div className="intelligence-grid">
        <article className="breadth-card"><div className="intel-label">MARKET BREADTH · TOP 50 ASSETS</div><div className="breadth-numbers"><strong className="up">{advancing}</strong><span>ADVANCING</span><strong className="down">{declining}</strong><span>DECLINING</span></div><div className="breadth-track"><span style={{width: `${coins.length ? advancing / coins.length * 100 : 0}%`}}/><i style={{width: `${coins.length ? declining / coins.length * 100 : 0}%`}}/></div><p>Share of tracked assets with positive or negative 24-hour performance. Flat assets are not counted in either side.</p></article>
        <article className="movers-card"><div className="intel-label">TOP 24H GAINERS</div>{loading ? <p className="mover-empty">Waiting for market data…</p> : gainers.map(c => <div className="mover-row" key={c.id}><img src={c.image} alt=""/><span><b>{c.name}</b><small>{c.symbol.toUpperCase()}</small></span><strong className="up">{pct(c.price_change_percentage_24h)}</strong></div>)}</article>
        <article className="movers-card"><div className="intel-label">TOP 24H DECLINERS</div>{loading ? <p className="mover-empty">Waiting for market data…</p> : decliners.map(c => <div className="mover-row" key={c.id}><img src={c.image} alt=""/><span><b>{c.name}</b><small>{c.symbol.toUpperCase()}</small></span><strong className="down">{pct(c.price_change_percentage_24h)}</strong></div>)}</article>
      </div>
      <p className="intel-source">Source: CoinGecko market API · Rankings reflect the tracked top 50 by market capitalisation and are informational only.</p>
    </section>
    <section className="investor-section" id="insights">
      <div className="investor-copy">
        <div className="eyebrow">02 / GLOBAL MARKET INTELLIGENCE</div>
        <h2>See the bigger picture.<br/><span>Understand the market.</span></h2>
        <p>Explore the forces shaping digital assets with a clear global perspective, live market data and accessible financial analysis.</p>
        <a className="primary-btn" href={telegramUrl} target="_blank" rel="noreferrer">Get updates on Telegram <span>↗</span></a>
        <div className="investor-points"><span>GLOBAL PERSPECTIVE</span><span>MARKET INSIGHTS</span><span>TELEGRAM COMMUNITY UPDATES</span></div>
      </div>
      <div className="investor-visual">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85" alt="International business professionals collaborating around a table"/>
        <div className="investor-shade"></div>
        <div className="analyst-screen">
          <div className="screen-top"><span>GLOBAL MARKET OVERVIEW</span><i>LIVE INSIGHTS</i></div>
          <div className="screen-title">Digital asset market</div>
          <div className="screen-chart"><svg viewBox="0 0 520 170" role="img" aria-label="Illustrative rising and falling market chart"><path d="M0 135 L55 116 L95 128 L145 80 L190 98 L235 60 L275 83 L320 44 L365 65 L405 26 L455 48 L520 10" fill="none" stroke="#e3bd72" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M0 135 L55 116 L95 128 L145 80 L190 98 L235 60 L275 83 L320 44 L365 65 L405 26 L455 48 L520 10 L520 170 L0 170Z" fill="url(#marketArea)" opacity=".22"/><defs><linearGradient id="marketArea" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#e3bd72"/><stop offset="1" stopColor="#e3bd72" stopOpacity="0"/></linearGradient></defs></svg></div>
          <div className="screen-bottom"><span>MARKET TRENDS</span><b>GLOBAL · DIGITAL ASSETS</b></div>
        </div>
        <div className="investor-caption">INSIGHT. CONNECTION. GLOBAL PERSPECTIVE.</div>
      </div>
    </section>
    <section className="about-section" id="about"><div className="eyebrow">03 / STAY CONNECTED</div><h2>Market insight here.<br/><span>Updates on Telegram.</span></h2><p>ITAL NOVA CRYPTO shares market intelligence on this website. For announcements, community discussions and ongoing updates, join our official Telegram channel. Telegram is our dedicated updates channel.</p><a className="primary-btn" href={telegramUrl} target="_blank" rel="noreferrer">Join our official Telegram <span>↗</span></a></section>
    <footer><a className="brand" href="#home"><span className="brand-icon">IN</span><span>ITAL NOVA <b>CRYPTO</b></span></a><span>© {new Date().getFullYear()} ITAL NOVA CRYPTO</span><span>Market data: CoinGecko</span><a href={telegramUrl} target="_blank" rel="noreferrer">Official Telegram ↗</a></footer>
    <div className="disclaimer">Market prices and charts are supplied by CoinGecko and may be delayed or temporarily unavailable. ITAL NOVA CRYPTO provides market information and educational tools.</div>
  </main>;
}
