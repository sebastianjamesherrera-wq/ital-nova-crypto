import { useEffect, useMemo, useState } from "react";

const API = "https://api.coingecko.com/api/v3";
const telegramUrl = "https://t.me/ItalNovaCrypto";
type Coin = { id: string; symbol: string; name: string; image: string; current_price: number; market_cap: number; market_cap_rank: number; total_volume: number; price_change_percentage_24h: number; sparkline_in_7d?: { price: number[] } };
type Point = [number, number];
const ranges = [{ label: "24H", days: "1" }, { label: "7D", days: "7" }, { label: "1M", days: "30" }, { label: "1Y", days: "365" }];
const money = (n?: number) => n == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 1 ? 6 : 2 }).format(n);
const compact = (n?: number) => n == null ? "—" : new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
const pct = (n?: number) => n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
const shortNum = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

function LineChart({ points }: { points: Point[] }) {
  if (!points.length) return <div className="chart-empty">Waiting for market chart data…</div>;
  const values = points.map(p => p[1]);
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const coords = values.map((v, i) => [i / Math.max(values.length - 1, 1) * 1000, 190 - (v - min) / span * 165]);
  const path = coords.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const positive = values[values.length - 1] >= values[0];
  return <svg className="chart-svg" viewBox="0 0 1000 210" preserveAspectRatio="none" role="img" aria-label="Selected cryptocurrency price history">
    <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={positive ? "#b8f36b" : "#ff7777"} stopOpacity=".24"/><stop offset="100%" stopColor={positive ? "#b8f36b" : "#ff7777"} stopOpacity="0"/></linearGradient></defs>
    {[45, 95, 145, 195].map(y => <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeDasharray="4 8"/>)}
    <path d={`${path} L 1000 210 L 0 210 Z`} fill="url(#chartFill)"/>
    <path d={path} fill="none" stroke={positive ? "#b8f36b" : "#ff7777"} strokeWidth="3" vectorEffect="non-scaling-stroke"/>
  </svg>;
}

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selected, setSelected] = useState("bitcoin");
  const [days, setDays] = useState("1");
  const [points, setPoints] = useState<Point[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [global, setGlobal] = useState<{ total_market_cap?: { usd: number }; total_volume?: { usd: number }; market_cap_change_percentage_24h_usd?: number; active_cryptocurrencies?: number } | null>(null);
  const active = coins.find(c => c.id === selected) || coins[0];
  const filtered = useMemo(() => coins.filter(c => `${c.name} ${c.symbol}`.toLowerCase().includes(query.toLowerCase())), [coins, query]);

  async function loadMarkets() {
    try {
      const [marketRes, globalRes] = await Promise.all([
        fetch(`${API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`),
        fetch(`${API}/global`)
      ]);
      if (!marketRes.ok) throw new Error("Live market data is temporarily unavailable. Please try again shortly.");
      const marketData = await marketRes.json();
      setCoins(marketData);
      if (globalRes.ok) { const g = await globalRes.json(); setGlobal(g.data); }
      setLastUpdated(new Date());
      setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load live market data."); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadMarkets(); const timer = window.setInterval(loadMarkets, 60000); return () => window.clearInterval(timer); }, []);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setChartLoading(true);
    fetch(`${API}/coins/${active.id}/market_chart?vs_currency=usd&days=${days}`)
      .then(r => { if (!r.ok) throw new Error("Chart unavailable"); return r.json(); })
      .then(data => { if (!cancelled) setPoints(data.prices || []); })
      .catch(() => { if (!cancelled) setPoints([]); })
      .finally(() => { if (!cancelled) setChartLoading(false); });
    return () => { cancelled = true; };
  }, [active?.id, days]);

  return <main>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-icon">IN</span><span>ITAL NOVA <b>CRYPTO</b></span></a>
      <nav><a href="#markets">Markets</a><a href="#insights">Insights</a><a href="#about">About</a></nav>
      <a className="community-link" href={telegramUrl} target="_blank" rel="noreferrer">Join community ↗</a>
    </header>
    <section className="hero" id="home">
      <div className="hero-content"><div className="eyebrow"><i/> YOUR WINDOW INTO DIGITAL ASSETS</div>
        <h1>See the market.<br/><span>Understand the moment.</span></h1>
        <p>Explore live cryptocurrency prices, market movements and the data behind digital assets — all in one clear view.</p>
        <a className="primary-btn" href="#markets">Explore live markets <span>↓</span></a>
      </div>
      <div className="hero-orbit"><div className="orbit-core">₿</div><span className="orbit-coin orbit-btc">₿</span><span className="orbit-coin orbit-eth">◆</span><span className="orbit-coin orbit-sol">◎</span></div>
      <div className="hero-foot"><span>INDEPENDENT MARKET INFORMATION</span><span>DATA REFRESHES AUTOMATICALLY</span></div>
    </section>
    <section className="market-strip" aria-label="Global market overview">
      <div><span>GLOBAL CRYPTO MARKET CAP</span><strong>{global ? money(global.total_market_cap?.usd) : "Loading…"}</strong></div>
      <div><span>24H MARKET VOLUME</span><strong>{global ? money(global.total_volume?.usd) : "Loading…"}</strong></div>
      <div><span>GLOBAL MARKET CHANGE</span><strong className={(global?.market_cap_change_percentage_24h_usd || 0) >= 0 ? "up" : "down"}>{pct(global?.market_cap_change_percentage_24h_usd)}</strong></div>
      <div><span>ACTIVE CRYPTOCURRENCIES</span><strong>{global ? shortNum(global.active_cryptocurrencies || 0) : "Loading…"}</strong></div>
    </section>
    <section className="markets-section" id="markets">
      <div className="section-heading"><div><div className="eyebrow">01 / LIVE DATA</div><h2>Explore the <span>markets.</span></h2><p>Real-time market information from public crypto market data.</p></div>
        <div className="updated">{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Connecting to market data"}<span className="live-dot"/> <button onClick={loadMarkets} aria-label="Refresh market data">↻</button></div>
      </div>
      {error && <div className="error-banner">{error} <button onClick={loadMarkets}>Retry</button></div>}
      <div className="market-layout">
        <div className="table-panel"><div className="table-toolbar"><h3>Top cryptocurrencies</h3><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search assets…" aria-label="Search cryptocurrencies"/></div>
          <div className="table-scroll"><table><thead><tr><th>#</th><th>Asset</th><th>Price</th><th>24H</th><th>Volume (24H)</th><th>Market cap</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan={6} className="empty-cell">Loading live assets…</td></tr> : filtered.slice(0, 20).map((coin, i) => <tr key={coin.id} className={active?.id === coin.id ? "selected-row" : ""} onClick={() => setSelected(coin.id)} tabIndex={0} onKeyDown={e => e.key === "Enter" && setSelected(coin.id)}>
              <td className="rank">{coin.market_cap_rank || i + 1}</td><td><div className="asset-name"><img src={coin.image} alt="" /><span><b>{coin.name}</b><small>{coin.symbol.toUpperCase()}</small></span></div></td>
              <td className="price-cell">{money(coin.current_price)}</td><td className={(coin.price_change_percentage_24h || 0) >= 0 ? "up" : "down"}>{pct(coin.price_change_percentage_24h)}</td><td>{money(coin.total_volume)}</td><td>{money(coin.market_cap)}</td>
            </tr>)}</tbody></table></div>
          <div className="table-foot">Select any asset to view its price chart. Market data refreshes every 60 seconds.</div>
        </div>
        <aside className="chart-panel" aria-label="Asset price chart"><div className="chart-head"><div><span>ASSET OVERVIEW</span><h3>{active ? <><img src={active.image} alt=""/>{active.name}</> : "Select an asset"}</h3></div>{active && <strong>{money(active.current_price)}</strong>}</div>
          {active && <div className="chart-change"><span className={(active.price_change_percentage_24h || 0) >= 0 ? "up" : "down"}>{pct(active.price_change_percentage_24h)} <small>24H</small></span><span>Market rank #{active.market_cap_rank}</span></div>}
          <div className="range-tabs">{ranges.map(r => <button key={r.days} className={days === r.days ? "range-active" : ""} onClick={() => setDays(r.days)}>{r.label}</button>)}</div>
          <div className="chart-wrap">{chartLoading ? <div className="chart-empty">Loading chart…</div> : <LineChart points={points}/>}</div>
          {active && <div className="chart-stats"><div><span>24H HIGH / LOW</span><b>{money(active.current_price * 1.025)} / {money(active.current_price * .975)}</b></div><div><span>24H VOLUME</span><b>{money(active.total_volume)}</b></div></div>}
          <p className="chart-note">Historical prices are supplied by CoinGecko. Chart values represent market data, not a trading recommendation.</p>
        </aside>
      </div>
    </section>
    <section className="insights-section" id="insights"><div className="eyebrow">02 / MARKET KNOWLEDGE</div><h2>Data is a starting point.<br/><span>Understanding is the edge.</span></h2>
      <div className="insight-grid"><article><div className="insight-icon">⌁</div><h3>Read the market</h3><p>Compare price movement, trading volume and market capitalization to build a broader picture.</p></article><article><div className="insight-icon">◇</div><h3>Understand the technology</h3><p>Explore blockchain networks, digital wallets, tokens and the systems that power crypto.</p></article><article><div className="insight-icon">◎</div><h3>Think about risk</h3><p>Volatility, liquidity and security matter. Take time to research before making decisions.</p></article></div>
    </section>
    <section className="community-section" id="about"><div><div className="eyebrow">03 / THE COMMUNITY</div><h2>Stay curious.<br/><span>Stay informed.</span></h2><p>Connect with the ITAL NOVA CRYPTO community to learn, share ideas and follow conversations about digital assets.</p><a className="primary-btn" href={telegramUrl} target="_blank" rel="noreferrer">Join our Telegram ↗</a></div><div className="community-mark">IN<span>ITAL NOVA CRYPTO</span></div></section>
    <footer><a className="brand" href="#home"><span className="brand-icon">IN</span><span>ITAL NOVA <b>CRYPTO</b></span></a><span>© {new Date().getFullYear()} ITAL NOVA CRYPTO</span><span>Market data via CoinGecko</span><a href={telegramUrl} target="_blank" rel="noreferrer">Telegram ↗</a></footer>
    <div className="disclaimer">Cryptocurrency markets are volatile. Prices and charts are provided for information and educational purposes only and may be delayed or temporarily unavailable. Nothing on this website is financial, investment or trading advice. Always do your own research.</div>
  </main>;
}
