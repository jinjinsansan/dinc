import { SectionHead } from './SectionHead';
import { Logo } from './Logo';

export function WhyD() {
  return (
    <section style={{ padding: '130px 30px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead no="03" en="WHY D" />
        <div className="dc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1.35, fontWeight: 700, margin: '0 0 26px' }}>
              「D」は、
              <br />
              意思決定の頭文字。
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 2.1, color: 'var(--sub)', margin: '0 0 18px' }}>
              Decision（決める）、Data（読む）、Develop（創る）——私たちのプロダクトはすべて、個人が次の一手を選ぶための道具です。ロゴの{' '}
              <b style={{ color: 'var(--text)' }}>「&gt;」</b> は、その一歩を前へ進めるスワイプの記号。
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 2.1, color: 'var(--sub)', margin: 0 }}>
              ネイビーのタイルはどのプロダクトにも共通する土台。色や世界観は変えても、「個人をエンパワーする」という芯だけは、すべてのDで変わりません。
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,var(--navy),var(--navy-deep))', borderRadius: 24, padding: 60, aspectRatio: '1 / 1' }}>
            <Logo size={180} bordered strokeWidth={2.6} style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.4))' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
