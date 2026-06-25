// 参考勝率(market_nar_v1)データ商品のローダー。
// 読み取り経路にDB/LLMは無い。VPS(/api/market)が同期済みJSONを返すだけ。
// ローカル(PCKEIBA到達)で predict_races.py が生成 → sync_preds.py でVPS同期。
// Vercel側の fetch データキャッシュ(revalidate)でエッジキャッシュ。

// nginx が /api/data を Flask(5000) へ流すため /api/data/market 配下に配置(VPS側と一致)。
const BASE = (process.env.MARKET_API_URL || "https://bot.dlogicai.in/api/data/market").replace(/\/$/, "");
const REVALIDATE = 60;

export type MarketHorse = {
  rank: number;          // モデル参考勝率の順位(1=最上位)
  umaban: number | null;
  bamei: string;
  p_cal: number | null;  // 単独キャリブレーション勝率(odds確定後のみ。pending時null)
  p_race: number;        // レース内正規化(合計1)。暫定ランキング
  ninki: number | null;  // 市場の単勝人気(1=1番人気)。odds未形成ならnull
  odds: number | null;   // 単勝オッズ。odds未形成ならnull
};

export type MarketRace = {
  race_key: string;
  venue: string;
  keibajo_code: string;
  race_number: number;
  kai?: 'nar' | 'jra';     // 地方(nar) / 中央(jra)
  show_value?: boolean;    // false(JRA)は妙味判定を出さない(市場のエコーでノイズのため)
  model?: string;
  field_size: number;
  odds_pending: boolean; // オッズ未形成(=絶対勝率は非信頼)
  horses: MarketHorse[];
};

export type MarketPreds = {
  date: string;          // YYYYMMDD
  model: string;
  generated_at: string;
  race_count: number;
  horse_count: number;
  disclaimer: string;
  pending_note?: string;
  races: MarketRace[];
};

const EMPTY: MarketPreds = {
  date: "", model: "", generated_at: "", race_count: 0, horse_count: 0,
  disclaimer: "", races: [],
};

/** 利用可能な予測日(YYYYMMDD)を新しい順に返す。 */
export async function loadDates(): Promise<string[]> {
  try {
    const r = await fetch(`${BASE}/dates`, { next: { revalidate: REVALIDATE } });
    if (!r.ok) return [];
    const d = await r.json();
    return Array.isArray(d?.dates) ? (d.dates as string[]) : [];
  } catch {
    return [];
  }
}

/** 指定日(省略時は最新)の参考勝率を返す。取得失敗時は EMPTY。 */
export async function loadPreds(date?: string): Promise<MarketPreds> {
  try {
    const q = date ? `?date=${encodeURIComponent(date)}` : "";
    const r = await fetch(`${BASE}/preds${q}`, { next: { revalidate: REVALIDATE } });
    if (!r.ok) return EMPTY;
    const d = await r.json();
    if (!Array.isArray(d?.races)) return EMPTY;
    return d as MarketPreds;
  } catch {
    return EMPTY;
  }
}

/** YYYYMMDD → "6/25(水)" 形式のラベル。 */
export function dateLabel(yyyymmdd: string): string {
  if (!/^\d{8}$/.test(yyyymmdd)) return yyyymmdd;
  const y = Number(yyyymmdd.slice(0, 4));
  const m = Number(yyyymmdd.slice(4, 6));
  const d = Number(yyyymmdd.slice(6, 8));
  const wd = ["日", "月", "火", "水", "木", "金", "土"][new Date(y, m - 1, d).getDay()];
  return `${m}/${d}(${wd})`;
}
