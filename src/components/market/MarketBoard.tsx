'use client';

import { useMemo, useState } from 'react';
import type { MarketPreds, MarketRace, MarketHorse } from '@/lib/market/preds';
import { dateLabel } from '@/lib/market/preds';

// 「参考勝率 × 市場オッズの乖離」を整形表示するデータ商品ビュー(LLM不使用)。
// 回収率・的中保証は出さない。odds未形成(pending)レースは絶対勝率を伏せ、暫定ランキングのみ。

type ValueTag = 'value' | 'neutral' | 'down' | 'none';

/** モデル順位 vs 市場人気の乖離を判定。showValue=false(JRA)は妙味を出さない。 */
function valueTag(h: MarketHorse, pending: boolean, showValue: boolean): ValueTag {
  if (!showValue || pending || h.ninki == null) return 'none';
  const gap = h.ninki - h.rank; // +なら市場より高評価
  if (h.rank <= 3 && gap >= 3) return 'value';   // モデル上位だが人気薄=妙味候補
  if (gap <= -3) return 'down';                  // モデルは市場より低評価
  return 'neutral';
}

const TAG_STYLE: Record<ValueTag, { label: string; cls: string } | null> = {
  value: { label: '妙味候補', cls: 'bg-[#F0B90B]/15 text-[#F0B90B] border-[#F0B90B]/40' },
  down: { label: '評価減', cls: 'bg-[#F6465D]/10 text-[#F6465D] border-[#F6465D]/30' },
  neutral: null,
  none: null,
};

function pct(x: number | null): string {
  return x == null ? '—' : `${(x * 100).toFixed(0)}%`;
}

/** YYYYMMDD のタブ表示ラベル(今日/明日/それ以外)。 */
function tabLabel(d: string, today: string): string {
  const next = (() => {
    if (!/^\d{8}$/.test(today)) return '';
    const dt = new Date(
      Number(today.slice(0, 4)),
      Number(today.slice(4, 6)) - 1,
      Number(today.slice(6, 8)) + 1,
    );
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const da = String(dt.getDate()).padStart(2, '0');
    return `${y}${m}${da}`;
  })();
  if (d === today) return `今日 ${dateLabel(d)}`;
  if (d === next) return `明日 ${dateLabel(d)}`;
  return dateLabel(d);
}

function HorseRow({ h, pending, showValue }: { h: MarketHorse; pending: boolean; showValue: boolean }) {
  const tag = TAG_STYLE[valueTag(h, pending, showValue)];
  return (
    <tr className="border-t border-[#2B3139]">
      <td className="py-2 pl-3 pr-2 text-[#B7BDC6] tabular-nums">{h.rank}</td>
      <td className="py-2 px-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#2B3139] text-xs font-bold text-[#EAECEF] tabular-nums">
          {h.umaban ?? '-'}
        </span>
      </td>
      <td className="py-2 px-2 font-medium text-[#EAECEF]">{h.bamei || '—'}</td>
      <td className="py-2 px-2 text-right font-bold text-[#FCD535] tabular-nums">{pct(h.p_race)}</td>
      <td className="py-2 px-2 text-right text-[#B7BDC6] tabular-nums">
        {h.ninki == null ? '—' : `${h.ninki}番人気`}
      </td>
      <td className="py-2 px-2 text-right text-[#B7BDC6] tabular-nums">
        {h.odds == null ? '—' : `${h.odds.toFixed(1)}`}
      </td>
      <td className="py-2 pl-2 pr-3 text-right">
        {tag && (
          <span className={`inline-block rounded border px-2 py-0.5 text-[11px] ${tag.cls}`}>
            {tag.label}
          </span>
        )}
      </td>
    </tr>
  );
}

function RaceCard({ race }: { race: MarketRace }) {
  const [open, setOpen] = useState(false);
  const pending = race.odds_pending;
  const showValue = race.show_value !== false; // 既定true(NAR)。JRAはfalse=妙味なし
  const top = race.horses[0];
  return (
    <div className="overflow-hidden rounded-lg border border-[#2B3139] bg-[#181A20]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#1E2127]"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#EAECEF]">
            {race.venue} {race.race_number}R
          </span>
          <span className="text-xs text-[#848E9C]">{race.field_size}頭</span>
          {pending && (
            <span className="rounded border border-[#F0B90B]/40 bg-[#F0B90B]/10 px-1.5 py-0.5 text-[11px] text-[#F0B90B]">
              オッズ待ち
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {top && (
            <span className="text-[#B7BDC6]">
              本命 <span className="font-bold text-[#EAECEF]">{top.umaban ?? '-'}</span>{' '}
              <span className="text-[#FCD535]">{pct(top.p_race)}</span>
            </span>
          )}
          <span className="text-[#848E9C]">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div className="overflow-x-auto border-t border-[#2B3139]">
          {pending && (
            <p className="px-4 py-2 text-[11px] text-[#848E9C]">
              ※オッズ未形成のため絶対勝率は非表示。下記は過去走ベースの暫定ランキングです。当日オッズ確定後に精度が上がります。
            </p>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-[#848E9C]">
                <th className="py-2 pl-3 pr-2 text-left font-normal">順</th>
                <th className="py-2 px-2 text-left font-normal">馬番</th>
                <th className="py-2 px-2 text-left font-normal">馬名</th>
                <th className="py-2 px-2 text-right font-normal">参考勝率</th>
                <th className="py-2 px-2 text-right font-normal">市場人気</th>
                <th className="py-2 px-2 text-right font-normal">オッズ</th>
                <th className="py-2 pl-2 pr-3 text-right font-normal">乖離</th>
              </tr>
            </thead>
            <tbody>
              {race.horses.map((h) => (
                <HorseRow key={`${h.umaban}-${h.rank}`} h={h} pending={pending} showValue={showValue} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MarketBoard({
  preds,
  dates,
  selected,
  today,
}: {
  preds: MarketPreds;
  dates: string[];
  selected: string;
  today: string;
}) {
  const [confirmedOnly, setConfirmedOnly] = useState(false);

  const confirmedCount = useMemo(
    () => preds.races.filter((r) => !r.odds_pending).length,
    [preds.races],
  );
  const pendingCount = preds.race_count - confirmedCount;

  // 中央(JRA)→地方(NAR) でグルーピングし、各々を会場別に。確定→待ち + レース番号順。
  const byKai = useMemo(() => {
    const target = confirmedOnly ? preds.races.filter((r) => !r.odds_pending) : preds.races;
    const order: Array<{ kai: 'jra' | 'nar'; label: string }> = [
      { kai: 'jra', label: '中央競馬' },
      { kai: 'nar', label: '地方競馬' },
    ];
    return order
      .map(({ kai, label }) => {
        const rs = target.filter((r) => (r.kai || 'nar') === kai);
        const m = new Map<string, MarketRace[]>();
        for (const r of rs) {
          const arr = m.get(r.venue) || [];
          arr.push(r);
          m.set(r.venue, arr);
        }
        for (const arr of m.values()) {
          arr.sort((a, b) => {
            if (a.odds_pending !== b.odds_pending) return a.odds_pending ? 1 : -1;
            return a.race_number - b.race_number;
          });
        }
        return { kai, label, count: rs.length, venues: Array.from(m.entries()) };
      })
      .filter((g) => g.count > 0);
  }, [preds.races, confirmedOnly]);

  // 昇順(今日→明日)でタブ表示
  const tabDates = useMemo(() => [...dates].sort(), [dates]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-3">
        <h1 className="text-xl font-bold text-[#EAECEF]">参考勝率</h1>
        <p className="mt-1 text-sm text-[#B7BDC6]">AIの独立推定 × 市場オッズの乖離</p>
      </header>

      {/* 日付タブ */}
      {tabDates.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tabDates.map((d) => {
            const active = d === selected;
            return (
              <a
                key={d}
                href={`/market-prob?date=${d}`}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? 'border-[#F0B90B] bg-[#F0B90B]/15 text-[#F0B90B]'
                    : 'border-[#2B3139] text-[#B7BDC6] hover:border-[#F0B90B]/50'
                }`}
              >
                {tabLabel(d, today)}
              </a>
            );
          })}
        </div>
      )}

      {preds.race_count === 0 ? (
        <div className="py-16 text-center text-[#848E9C]">
          {dateLabel(selected)} の参考勝率データはまだありません。
        </div>
      ) : (
        <>
          {/* サマリ + トグル */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#2B3139] bg-[#181A20] px-4 py-3">
            <div className="text-sm text-[#B7BDC6]">
              全{preds.race_count}R ・{' '}
              <span className="text-[#0ECB81]">オッズ確定 {confirmedCount}</span> /{' '}
              <span className="text-[#F0B90B]">オッズ待ち {pendingCount}</span>
            </div>
            {confirmedCount > 0 && (
              <button
                onClick={() => setConfirmedOnly((v) => !v)}
                className={`rounded border px-3 py-1 text-xs transition ${
                  confirmedOnly
                    ? 'border-[#F0B90B] bg-[#F0B90B]/15 text-[#F0B90B]'
                    : 'border-[#2B3139] text-[#B7BDC6] hover:border-[#F0B90B]/50'
                }`}
              >
                {confirmedOnly ? 'すべて表示' : 'オッズ確定のみ'}
              </button>
            )}
          </div>

          {pendingCount > 0 && !confirmedOnly && (
            <p className="mb-4 text-xs leading-relaxed text-[#848E9C]">
              「オッズ待ち」は市場オッズが未形成のレースです。乖離(妙味)判定は出せないため、
              暫定ランキングのみ表示します。<span className="text-[#B7BDC6]">レース当日、発走が近づくほどオッズが確定し精度が上がります</span>。
            </p>
          )}

          <div className="space-y-8">
            {byKai.map((g) => (
              <div key={g.kai} className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-2 border-b border-[#2B3139] pb-1">
                  <h2 className="text-base font-bold text-[#EAECEF]">{g.label}</h2>
                  {g.kai === 'jra' && (
                    <span className="text-[11px] text-[#848E9C]">
                      市場の整理(妙味判定なし)
                    </span>
                  )}
                </div>
                {g.venues.map(([venue, races]) => (
                  <section key={venue}>
                    <h3 className="mb-2 text-sm font-bold text-[#F0B90B]">{venue}</h3>
                    <div className="space-y-2">
                      {races.map((r) => (
                        <RaceCard key={r.race_key} race={r} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 rounded-lg border border-[#2B3139] bg-[#181A20] px-4 py-3 text-xs leading-relaxed text-[#848E9C]">
        参考勝率は、過去走・騎手・条件などから算出した
        <span className="text-[#B7BDC6]">市場(オッズ)と同等精度の独立推定</span>です。
        市場より高く評価した馬には<span className="text-[#F0B90B]">「妙味候補」</span>を表示します。
        <span className="text-[#B7BDC6]">回収率・的中を保証するものではありません</span>。最終判断はご自身で。
      </div>

      <p className="mt-4 text-center text-[11px] text-[#5E6673]">
        model: {preds.model || '—'} ・ generated: {preds.generated_at || '—'}
      </p>
    </div>
  );
}
