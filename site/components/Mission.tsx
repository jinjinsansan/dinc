import { SectionHead } from './SectionHead';
import { values } from '@/lib/data';

export function Mission() {
  return (
    <section id="about" style={{ padding: '130px 30px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead no="01" en="MISSION" />
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1.35, fontWeight: 700, letterSpacing: '-.01em', margin: 0, maxWidth: '20em' }}>
          テクノロジーを、
          <br />
          誰もが使える<span style={{ color: 'var(--cyan)' }}>「力」</span>に。
        </h2>
        <p style={{ margin: '38px 0 0', fontSize: 17, lineHeight: 2.1, color: 'var(--sub)', maxWidth: '42em' }}>
          専門知識や資本がなくても、AIがあれば誰もが「作れる側・選べる側」に立てる時代になりました。株式会社Dは、その変化を一人ひとりの手元に届けるために、難しい技術を
          <b style={{ color: 'var(--text)', fontWeight: 700 }}>親しみやすいプロダクト</b>
          へと翻訳し続けます。予測する、創る、出会う、学ぶ——日常のあらゆる意思決定を、テクノロジーで少しだけ賢く、ずっと楽しく。
        </p>

        <div
          className="dc-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden', marginTop: 64 }}
        >
          {values.map((v) => (
            <div key={v.no} style={{ background: 'var(--surface)', padding: '38px 30px' }}>
              <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, letterSpacing: '.14em', color: v.color, marginBottom: 18 }}>{v.no}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 23, fontWeight: 700, margin: '0 0 14px', lineHeight: 1.4 }}>{v.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--sub)', margin: 0 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
