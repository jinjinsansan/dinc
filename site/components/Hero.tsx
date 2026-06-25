import { heroStats, marquee } from '@/lib/data';

export function Hero() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg,var(--navy),var(--navy-deep))',
        color: '#eaf2fb',
        overflow: 'hidden',
      }}
    >
      {/* product-accent floating dots */}
      <div style={{ position: 'absolute', top: '14%', right: '8%', width: 11, height: 11, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 26px var(--cyan)', animation: 'dcFloat 7s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: '62%', right: '20%', width: 9, height: 9, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 22px var(--gold)', animation: 'dcFloat 9s ease-in-out infinite 1s', opacity: 0.7 }} />
      <div style={{ position: 'absolute', top: '34%', left: '11%', width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)', boxShadow: '0 0 20px var(--pink)', animation: 'dcFloat 8s ease-in-out infinite .6s', opacity: 0.7 }} />
      <div style={{ position: 'absolute', top: '-18%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, maxWidth: '130vw', background: 'radial-gradient(circle,rgba(34,184,230,.14),transparent 62%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '120px 30px 130px' }}>
        <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, letterSpacing: '.32em', color: 'var(--cyan)', marginBottom: 34 }}>
          D INC. — AI PRODUCT STUDIO
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6.6vw,92px)', lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', margin: 0, maxWidth: '18em' }}>
          AIで、個人の
          <br />
          <span style={{ color: 'var(--cyan)' }}>「できる」</span>を増やす。
        </h1>
        <p style={{ margin: '38px 0 0', fontSize: 'clamp(15px,1.8vw,19px)', lineHeight: 2, color: 'rgba(234,242,251,.82)', maxWidth: '40em', fontWeight: 400 }}>
          予測市場から競馬AI、性格診断、ノーコード開発教育まで。
          <br />
          私たちは、テクノロジーで一人ひとりの意思決定と創造を後押しする
          <br />
          プロダクト群「<span style={{ color: '#fff', fontWeight: 700 }}>Dファミリー</span>」を運営しています。
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 46 }}>
          <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, padding: '16px 30px', borderRadius: 999, background: 'var(--cyan)', color: 'var(--navy-deep)', textDecoration: 'none' }}>
            プロダクトを見る <span>→</span>
          </a>
          <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, padding: '16px 30px', borderRadius: 999, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.2)', color: '#eaf2fb', textDecoration: 'none' }}>
            私たちについて
          </a>
        </div>
      </div>

      {/* stat strip */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,.1)', background: 'rgba(8,22,39,.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div
          className="dc-hero-stats"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '26px 30px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}
        >
          {heroStats.map((s, i) => (
            <div key={s.l} style={{ borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none', paddingLeft: i ? 20 : 0 }}>
              <div style={{ fontFamily: 'var(--inter)', fontSize: 34, fontWeight: 800, letterSpacing: '-.02em', color: '#fff', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'rgba(234,242,251,.6)', marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* family marquee */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,.1)', overflow: 'hidden', padding: '16px 0' }}>
        <div className="dc-marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} style={{ fontFamily: 'var(--inter)', fontSize: 15, fontWeight: 700, letterSpacing: '.04em', color: 'rgba(234,242,251,.4)' }}>
              {m.label}
              <span style={{ color: m.dot }}> ●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
