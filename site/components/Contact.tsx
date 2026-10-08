'use client';

import { useState } from 'react';
import { contactTopics } from '@/lib/data';
import { useToast } from './Toast';

// Web3Forms（送信先 dllcjin@proton.me に紐づくアクセスキー。公開前提のキー）
const WEB3FORMS_KEY = 'b7f388e1-36b1-42b3-884d-71e2137ebb06';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [website, setWebsite] = useState(''); // ハニーポット
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!name.trim() || !email.trim() || !msg.trim()) {
      flash('お名前・メール・内容をご入力ください');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      flash('メールアドレスをご確認ください');
      return;
    }
    // ハニーポットに入力があればボットとみなし、送信せずに成功表示
    if (website) {
      flash('送信しました。内容を確認のうえ、ご連絡いたします');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `【お問い合わせ/${topic}】${name.trim()} 様`,
          from_name: '合同会社D コーポレートサイト',
          種別: topic,
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        flash('送信に失敗しました。時間をおいて再度お試しください');
        return;
      }
      flash('送信しました。内容を確認のうえ、ご連絡いたします');
      setName('');
      setEmail('');
      setMsg('');
    } catch {
      flash('通信エラーが発生しました。時間をおいて再度お試しください');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 30px 130px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--inter)', fontSize: 12, fontWeight: 700, letterSpacing: '.22em', color: 'var(--cyan)', marginBottom: 22 }}>CONTACT</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4.6vw,52px)', fontWeight: 700, lineHeight: 1.3, margin: '0 0 20px' }}>お問い合わせ</h2>
        <p style={{ fontSize: 15.5, color: 'var(--sub)', lineHeight: 2, margin: '0 0 40px' }}>
          取材・協業・採用・各プロダクトに関するお問い合わせは、
          <br />
          すべて下記フォームにて承っております。
        </p>
        <form onSubmit={submit} noValidate style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 20, padding: 34, textAlign: 'left', boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
          <div className="dc-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>お名前</label>
              <input className="dc-field" name="name" autoComplete="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" style={fieldStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--sub)', marginBottom: 8 }}>メール</label>
              <input className="dc-field" name="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" style={fieldStyle} />
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
            <textarea className="dc-field" name="message" maxLength={5000} value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="お問い合わせ内容をご記入ください" style={{ ...fieldStyle, resize: 'none' }} />
          </div>
          <button
            type="submit"
            disabled={sending}
            style={{ width: '100%', cursor: sending ? 'wait' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 15, padding: 15, border: 'none', borderRadius: 12, background: 'var(--navy)', color: '#fff', opacity: sending ? 0.6 : 1 }}
          >
            {sending ? '送信中…' : '送信する'}
          </button>
        </form>
      </div>
    </section>
  );
}
