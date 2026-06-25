export function SectionHead({ no, en, mb = 54 }: { no: string; en: string; mb?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: mb }}>
      <span style={{ fontFamily: 'var(--inter)', fontSize: 13, fontWeight: 700, color: 'var(--cyan)' }}>{no}</span>
      <span style={{ fontFamily: 'var(--inter)', fontSize: 12, letterSpacing: '.22em', fontWeight: 700, color: 'var(--dim)' }}>{en}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
    </div>
  );
}
