import { useState, useEffect } from "react";
import CONFIG from "./config.js";
import { burst, SWATCH } from "./confetti.js";
import "./App.css";

const TILTS = [-4, 3, -2, 5, -3, 2, -5, 4];

/* ---------- Cake with candles ---------- */
function Cake({ onAllOut }) {
  const [lit, setLit] = useState([true, true, true, true, true]);
  const xs = [96, 128, 160, 192, 224];
  const out = lit.every((v) => !v);

  const blow = (i) => {
    if (!lit[i]) return;
    const next = lit.map((v, j) => (j === i ? false : v));
    setLit(next);
    if (next.every((v) => !v)) onAllOut();
  };

  return (
    <div className="cake-box">
      <svg className="cake" viewBox="0 0 320 320" role="img" aria-label="Birthday cake with candles">
        <ellipse cx="160" cy="292" rx="132" ry="16" fill="rgba(43,29,58,.12)" />
        <rect x="50" y="200" width="220" height="86" rx="14" fill="#ff4f8b" />
        <path d="M50 214 q18 22 36 0 t36 0 t36 0 t36 0 t36 0 t40 0 v-6 h-220z" fill="#fff6d6" />
        <rect x="70" y="140" width="180" height="66" rx="12" fill="#4cc3d9" />
        <path d="M70 152 q15 18 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 v-8 h-180z" fill="#ffffff" />
        {[70, 110, 150, 190, 230].map((x) => (
          <circle key={x} cx={x + 10} cy="248" r="5" fill="#ffe9a8" />
        ))}

        {xs.map((x, i) => (
          <g
            key={i}
            className="candle-btn"
            role="button"
            tabIndex={0}
            aria-label={lit[i] ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
            onClick={() => blow(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blow(i); }
            }}
          >
            <rect x={x - 18} y="60" width="36" height="84" fill="transparent" />
            <rect x={x - 5} y="96" width="10" height="46" rx="3" fill={SWATCH[(i + 2) % 6]} />
            <line x1={x} y1="96" x2={x} y2="88" stroke="#2b1d3a" strokeWidth="2" />
            {lit[i] ? (
              <g className="flame" style={{ transformBox: "fill-box" }}>
                <path d={`M${x} 64 C ${x + 10} 76, ${x + 8} 88, ${x} 89 C ${x - 8} 88, ${x - 10} 76, ${x} 64 Z`} fill="#ffb547" />
                <path d={`M${x} 74 C ${x + 4} 80, ${x + 4} 86, ${x} 87 C ${x - 4} 86, ${x - 4} 80, ${x} 74 Z`} fill="#fff6d6" />
              </g>
            ) : (
              <path className="smoke" d={`M${x} 86 q-6 -8 0 -16 q6 -8 0 -16`} stroke="#6a5580" strokeWidth="2" fill="none" />
            )}
          </g>
        ))}
      </svg>

      {out ? (
        <button className="btn ghost" onClick={() => setLit([true, true, true, true, true])}>
          Light them again
        </button>
      ) : (
        <p className="note" style={{ margin: 0 }}>Make a wish, then tap each candle to blow it out</p>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [wished, setWished] = useState(false);
  const onAllOut = () => {
    setWished(true);
    burst(220);
    setTimeout(() => burst(140), 500);
  };

  return (
    <header className="wrap hero">
      <div>
        {CONFIG.age && <span className="age-chip">Turning {CONFIG.age}</span>}
        <p className="eyebrow" style={{ marginTop: 14 }}>
          {wished ? "Your wish is on its way" : "Psst, this page is all yours"}
        </p>
        <h1>
          Happy Birthday, <span className="name">{CONFIG.name}!</span>
        </h1>
        <p>{CONFIG.heroLine}</p>
      </div>
      <Cake onAllOut={onAllOut} />
    </header>
  );
}

/* ---------- Letter ---------- */
function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <section className="wrap">
      <p className="eyebrow">A little letter</p>
      <h2>Read this when you're smiling</h2>
      <div className="letter-grid" style={{ marginTop: 26 }}>
        <div className="envelope">
          {open ? (
            <div className="paper-letter unfold">
              <p>Dear {CONFIG.name},</p>
              {CONFIG.letter.map((t, i) => <p key={i}>{t}</p>)}
              <p className="sign">Love always, {CONFIG.from}</p>
            </div>
          ) : (
            <button className="sealed" onClick={() => { setOpen(true); burst(60); }}>
              <div className="seal">♥</div>
              <span>Tap to open your letter</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo wall ---------- */
function PhotoTile({ photo, index, big }) {
  if (photo.src) return <img className="ph" src={photo.src} alt={photo.caption} loading="lazy" />;
  return (
    <div
      className="ph ph-empty"
      style={{ background: `linear-gradient(135deg, ${SWATCH[index % 6]}55, ${SWATCH[(index + 2) % 6]}55)` }}
    >
      {big ? "Your photo goes here" : `Photo ${index + 1}`}
    </div>
  );
}

function Photos() {
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <section className="wrap">
      <p className="eyebrow">Evidence of our friendship</p>
      <h2>The photo wall</h2>
      <div className="photo-wall">
        {CONFIG.photos.map((p, i) => (
          <button
            key={i}
            className="polaroid"
            style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            onClick={() => setZoom(i)}
            aria-label={`Open photo: ${p.caption}`}
          >
            <PhotoTile photo={p} index={i} />
            <span className="cap">{p.caption}</span>
          </button>
        ))}
      </div>

      {zoom !== null && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label="Photo">
          <button className="btn close" onClick={() => setZoom(null)}>Close</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <PhotoTile photo={CONFIG.photos[zoom]} index={zoom} big />
            <figcaption>{CONFIG.photos[zoom].caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ---------- Reasons (flip cards) ---------- */
function Reasons() {
  const [flipped, setFlipped] = useState({});
  return (
    <section className="wrap">
      <p className="eyebrow">Tap each card</p>
      <h2>Why you're my favourite human</h2>
      <div className="reasons">
        {CONFIG.reasons.map((r, i) => (
          <button
            key={i}
            className={"flip" + (flipped[i] ? " on" : "")}
            aria-pressed={!!flipped[i]}
            onClick={() => setFlipped((s) => ({ ...s, [i]: !s[i] }))}
          >
            <div className="flip-inner">
              <div className="face front" style={{ background: i % 2 ? "var(--pop)" : "var(--ink)" }}>
                <div>
                  {r.front}
                  <small>Reason {i + 1} of {CONFIG.reasons.length}</small>
                </div>
              </div>
              <div className="face back">{r.back}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Timeline ---------- */
function Timeline() {
  return (
    <section className="wrap">
      <p className="eyebrow">How we got here</p>
      <h2>Our story so far</h2>
      <ol className="timeline">
        {CONFIG.timeline.map((t, i) => (
          <li key={i}>
            <span className="dot" style={{ background: SWATCH[i % 6] }}>{i + 1}</span>
            <div className="tl-card">
              <div className="when">{t.when}</div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Finale ---------- */
function Finale() {
  return (
    <footer className="wrap finale">
      <p className="eyebrow">One last thing</p>
      <h2>Happy birthday, {CONFIG.name}</h2>
      <p>{CONFIG.finale}</p>
      <button className="btn" onClick={() => burst(240)}>Throw more confetti</button>
      <p className="note" style={{ marginTop: 28 }}>Made with love by {CONFIG.from}</p>
    </footer>
  );
}

export default function App() {
  // Celebrate as soon as the page opens
  useEffect(() => {
    const t1 = setTimeout(() => burst(200), 400);
    const t2 = setTimeout(() => burst(140), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <canvas id="confetti" aria-hidden="true" />
      <Hero />
      <Letter />
      <Photos />
      <Reasons />
      <Timeline />
      <Finale />
    </>
  );
}
