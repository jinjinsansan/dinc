import NavigationBar from '@/components/navigation/NavigationBar';
import { getMemberSession } from '@/lib/auth/session';
import LoginPrompt from '@/components/shared/LoginPrompt';
import MarketBoard from '@/components/market/MarketBoard';
import { loadPreds, loadDates } from '@/lib/market/preds';

export const dynamic = 'force-dynamic';

/** JST(UTC+9)の今日を YYYYMMDD で返す。 */
function jstToday(): string {
  const j = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return j.toISOString().slice(0, 10).replace(/-/g, '');
}

export default async function MarketProbPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const session = await getMemberSession();
  if (!session?.user?.email) {
    return (
      <LoginPrompt
        title="ログインが必要です"
        desc="参考勝率はDロジくん会員向け機能です。ログインして続けてください。"
      />
    );
  }

  const dates = await loadDates(); // 新しい順 (例: ["20260625","20260624"])
  const today = jstToday();
  const q = searchParams?.date;
  // 既定は「今日」(オッズが形成され始める当日)。明日は全pendingになりがちなので既定にしない。
  const selected =
    q && /^\d{8}$/.test(q) && dates.includes(q)
      ? q
      : dates.includes(today)
      ? today
      : dates[dates.length - 1] || ''; // 直近(=最も小さい日付=今日寄り)

  const preds = await loadPreds(selected || undefined);

  return (
    <div className="min-h-screen bg-[#050608] text-[#EAECEF]">
      <NavigationBar />
      <main className="pt-16">
        <MarketBoard preds={preds} dates={dates} selected={selected} today={today} />
      </main>
    </div>
  );
}
