'use client';

import { SectionHead } from './SectionHead';
import { Logo } from './Logo';
import { products } from '@/lib/data';
import { useToast } from './Toast';

export function Products() {
  const { flash } = useToast();

  return (
    <section id="products" style={{ padding: '130px 30px', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead no="02" en="PRODUCTS — Dファミリー" mb={24} />
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4.4vw,50px)', lineHeight: 1.2, fontWeight: 700, margin: '0 0 16px' }}>
          ひとつのDから、
          <br />
          5つのプロダクトへ。
        </h2>
        <p style={{ fontSize: 16, color: 'var(--sub)', margin: '0 0 54px', maxWidth: '40em' }}>
          共通するのは「AIで個人をエンパワーする」という思想と、ネイビータイルのDロゴ。世界観はそれぞれ独立しています。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {products.map((p) => {
            const external = p.href.startsWith('http');
            const handleClick = (e: React.MouseEvent) => {
              if (!external) {
                e.preventDefault();
                flash(`${p.name} のサイトへ（準備中）`);
              }
            };
            return (
              <a
                key={p.name}
                href={p.href}
                onClick={handleClick}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="dc-product-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 28,
                  alignItems: 'center',
                  border: '1px solid var(--line)',
                  borderLeft: `4px solid ${p.accent}`,
                  background: 'var(--surface)',
                  borderRadius: 18,
                  padding: '28px 32px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Logo size={60} mono={p.mono} stroke={p.mark} tile={p.tileBg} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ fontFamily: 'var(--inter)', fontSize: 23, fontWeight: 800, letterSpacing: '-.01em', margin: 0, color: 'var(--text)' }}>{p.name}</h3>
                    <span style={{ fontSize: 12, fontWeight: 700, color: p.accent, background: `${p.accent}1a`, borderRadius: 6, padding: '3px 10px' }}>{p.tag}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14.5, color: 'var(--sub)', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
                <div className="dc-product-status" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, color: 'var(--dim)' }}>{p.status}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: p.accent, marginTop: 4 }}>詳しく →</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
