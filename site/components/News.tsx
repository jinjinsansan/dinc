'use client';

import { SectionHead } from './SectionHead';
import { news } from '@/lib/data';
import { useToast } from './Toast';

export function News() {
  const { flash } = useToast();

  return (
    <section id="news" style={{ padding: '120px 30px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHead no="05" en="NEWS" mb={40} />
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {news.map((n) => (
            <div
              key={n.title}
              onClick={() => flash('ニュース記事へ（準備中）')}
              className="dc-news-row"
              style={{ display: 'grid', gridTemplateColumns: '130px 110px 1fr auto', gap: 22, alignItems: 'center', padding: '22px 6px', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}
            >
              <span style={{ fontFamily: 'var(--inter)', fontSize: 13, fontWeight: 600, color: 'var(--dim)' }}>{n.date}</span>
              <span className="dc-news-cat" style={{ fontSize: 11, fontWeight: 700, color: n.catColor, background: n.catBg, borderRadius: 6, padding: '4px 10px', textAlign: 'center' }}>{n.cat}</span>
              <span className="dc-news-title" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{n.title}</span>
              <span className="dc-news-arrow" style={{ color: 'var(--faint)' }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
