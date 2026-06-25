import { SectionHead } from './SectionHead';
import { company } from '@/lib/data';

export function Company() {
  return (
    <section id="company" style={{ padding: '130px 30px', background: 'var(--paper2)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHead no="04" en="COMPANY" mb={48} />
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, margin: '0 0 44px' }}>会社概要</h2>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden' }}>
          {company.map((c) => (
            <div
              key={c.k}
              className="dc-company-row"
              style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, padding: '22px 32px', borderBottom: '1px solid var(--hair)' }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dim)', fontFamily: 'var(--inter)', letterSpacing: '.04em' }}>
                {c.k}
                <span style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--sub)', marginTop: 2 }}>{c.kj}</span>
              </div>
              <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{c.v}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--faint)', margin: '14px 0 0' }}>※ 一部の項目はサンプル値です。実データに差し替えてください。</p>
      </div>
    </section>
  );
}
