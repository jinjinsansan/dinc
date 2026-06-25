export function Recruit() {
  return (
    <section style={{ padding: '120px 30px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 26, background: 'linear-gradient(135deg,var(--navy),var(--navy-deep))', color: '#eaf2fb', padding: '64px 56px' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,184,230,.16),transparent 65%)' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
            <div>
              <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, letterSpacing: '.22em', color: 'var(--cyan)', marginBottom: 18 }}>RECRUIT</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,3.6vw,40px)', fontWeight: 700, lineHeight: 1.4, margin: '0 0 12px' }}>
                「作れる側」を、
                <br />
                一緒に増やす仲間を。
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(234,242,251,.78)', margin: 0, maxWidth: '34em' }}>
                エンジニア、デザイナー、AIプロダクトの企画。少人数で大きく動かすチームです。
              </p>
            </div>
            <a href="#contact" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, padding: '17px 32px', borderRadius: 999, background: 'var(--cyan)', color: 'var(--navy-deep)', textDecoration: 'none' }}>
              採用情報を見る <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
