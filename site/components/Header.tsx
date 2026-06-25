'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { navLinks } from '@/lib/data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 30;
      setScrolled((prev) => (prev !== s ? s : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navInk = scrolled ? 'var(--ink)' : '#fff';
  const navSub = scrolled ? 'var(--sub)' : 'rgba(234,242,251,.7)';
  const navFaint = scrolled ? 'var(--faint)' : 'rgba(234,242,251,.45)';
  const navLinkColor = scrolled ? 'var(--text)' : 'rgba(234,242,251,.85)';
  const navCtaBg = scrolled ? 'var(--navy)' : 'rgba(255,255,255,.1)';
  const navCtaBorder = scrolled ? 'var(--navy)' : 'rgba(255,255,255,.25)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: scrolled ? 'rgba(246,248,251,.85)' : 'transparent',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        transition: 'all .3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '15px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <a
          href="#top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Logo size={34} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span
              style={{
                fontFamily: 'var(--inter)',
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: '-.02em',
                color: navInk,
              }}
            >
              D<span style={{ color: navSub, fontWeight: 600 }}> Inc.</span>
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: navSub }}>株式会社D</span>
          </div>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div className="dc-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '.02em',
                  color: navLinkColor,
                  textDecoration: 'none',
                  padding: '9px 13px',
                  borderRadius: 8,
                }}
              >
                {n.label}
                <span
                  style={{
                    fontFamily: 'var(--inter)',
                    fontSize: 9,
                    color: navFaint,
                    marginLeft: 5,
                    letterSpacing: '.1em',
                  }}
                >
                  {n.en}
                </span>
              </a>
            ))}
          </div>
          <a
            href="#contact"
            style={{
              marginLeft: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 13,
              fontWeight: 700,
              padding: '10px 20px',
              borderRadius: 999,
              background: navCtaBg,
              color: '#fff',
              textDecoration: 'none',
              border: `1px solid ${navCtaBorder}`,
              transition: 'all .3s ease',
            }}
          >
            お問い合わせ <span style={{ fontSize: 14 }}>→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
