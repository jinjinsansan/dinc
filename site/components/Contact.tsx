'use client';

import { useState } from 'react';
import { contactTopics } from '@/lib/data';
import { useToast } from './Toast';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--line)',
  background: 'var(--paper)',
  borderRadius: 10,
  padding: '12px 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  color: 'var(--text)',
  outline: 'none',
};

export function Contact() {
  const { flash } = useToast();
  const [topic, setTopic] = useState(contactTopics[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      flash('お名前とメールをご入力ください');
      return;
    }
    // TODO: 本番ではメール送信 / フォームSaaS / API に結線
    flash('送信しました（デモ）。ありがとうございます');
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <section id="contact" style={{ padding: '120px 30px 130px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, letterSpacing: '.22em', color: 'var(--cyan)', marginBottom: 22 }}>CONTACT</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4.6vw,52px)', fontWeight: 700, lineHeight: 1.3, margin: '0 0 20px' }}>お問い合わせ</h2>
        <p style={{ fontSize: 15.5, color: 'var(--sub)', lineHeight: 2, margin: '0 0 40px' }}>
          取材・協業・採用・各プロダクトに関するお問い合わせは、
          <br />
          下記フォームよりお気軽にご連絡ください。
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 20, padding: 34, textAlign: 'left', boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
          <div className="dc-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>お名前</label>
              <input className="dc-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" style={fieldStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>メール</label>
              <input className="dc-field" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" style={fieldStyle} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>種別</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {contactTopics.map((t) => {
                const on = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    style={{
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '8px 16px',
                      borderRadius: 999,
                      border: `1px solid ${on ? 'var(--navy)' : 'var(--line)'}`,
                      background: on ? 'var(--navy)' : 'transparent',
                      color: on ? '#fff' : 'var(--sub)',
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>内容</label>
            <textarea className="dc-field" value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="お問い合わせ内容をご記入ください" style={{ ...fieldStyle, resize: 'none' }} />
          </div>
          <button
            type="button"
            onClick={submit}
            style={{ width: '100%', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 15, padding: 15, border: 'none', borderRadius: 12, background: 'var(--navy)', color: '#fff' }}
          >
            送信する
          </button>
        </div>
      </div>
    </section>
  );
}
