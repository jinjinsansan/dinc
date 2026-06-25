'use client';

import { Logo } from './Logo';
import { footerCols } from '@/lib/data';
import { useToast } from './Toast';

export function Footer() {
  const { flash } = useToast();

  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'rgba(234,242,251,.7)', padding: '72px 30px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="dc-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 44, marginBottom: 54 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
              <Logo size={30} bordered />
              <span style={{ fontFamily: 'var(--inter)', fontWeight: 800, fontSize: 18, color: '#fff' }}>D Inc.</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(234,242,251,.55)', margin: 0, maxWidth: '24em' }}>
              AIで個人の「できる」を増やすプロダクトスタジオ。Dファミリーを企画・開発・運営しています。
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--inter)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'rgba(234,242,251,.4)', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map((l) => {
                  const legal = col.title === 'LEGAL';
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={
                        legal
                          ? (e) => {
                              e.preventDefault();
                              flash(`${l.label}（準備中）`);
                            }
                          : undefined
                      }
                      className="dc-footer-link"
                      style={{ fontSize: 13, color: 'rgba(234,242,251,.7)', textDecoration: 'none' }}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 26, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12, color: 'rgba(234,242,251,.4)' }}>
          <span>© 2026 D Inc. 株式会社D</span>
          <span style={{ fontFamily: 'var(--inter)', letterSpacing: '.04em' }}>D-market · D-swipe · Dlogic · D-lab · Togel</span>
        </div>
      </div>
    </footer>
  );
}
