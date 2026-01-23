import { useEffect, useMemo, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { supabase } from "../../../db/supabase.client";

export const StatsCards = ({ postCount }) => {
  const [monthly, setMonthly] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("umami_monthly_metrics")
        .select("month_start, visitors")
        .eq("dimension", "overall")
        .eq("key", "site")
        .order("month_start", { ascending: true });

      if (cancelled) return;
      if (error) setErr(error.message);
      else setMonthly(data ?? []);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const nf = useMemo(() => new Intl.NumberFormat("en-US"), []);
  const pf = useMemo(
    () => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }),
    []
  );

  const {
    avg6,
    avg6Trend,
    avg6Pct,
    avg6Period,
    trailing12,
    trailing12Trend,
    trailing12Pct,
    trailing12Period,
  } = useMemo(() => {
    const rows = monthly.filter((r) => r.month_start);

    const takeLast = (arr, n) => arr.slice(Math.max(0, arr.length - n));
    const takePrev = (arr, n) => arr.slice(Math.max(0, arr.length - 2 * n), Math.max(0, arr.length - n));

    const sum = (arr) => arr.reduce((acc, r) => acc + (r.visitors ?? 0), 0);

    const formatRange = (startStr, endStr) => {
      if (!startStr || !endStr) return "";
      const start = new Date(`${startStr}T00:00:00Z`);
      const end = new Date(`${endStr}T00:00:00Z`);
      const startLabel = start.toLocaleString("en-US", { month: "short", year: "numeric" });
      const endLabel = end.toLocaleString("en-US", { month: "short", year: "numeric" });
      return `${startLabel} – ${endLabel}`;
    };

    const last6 = takeLast(rows, 6);
    const prev6 = takePrev(rows, 6);

    const last6Sum = sum(last6);
    const prev6Sum = sum(prev6);

    const avg6Val = last6.length ? last6Sum / last6.length : null;
    const prevAvg6 = prev6.length ? prev6Sum / prev6.length : null;

    let avg6PctVal = null;
    let avg6TrendVal = "none";
    if (avg6Val != null && prevAvg6 != null && prevAvg6 > 0) {
      avg6PctVal = ((avg6Val - prevAvg6) / prevAvg6) * 100;
      avg6TrendVal = avg6PctVal > 0 ? "up" : avg6PctVal < 0 ? "down" : "none";
    }

    const avg6PeriodVal =
      last6.length >= 2
        ? formatRange(last6[0].month_start, last6[last6.length - 1].month_start)
        : "Last 6 months";

    const last12 = takeLast(rows, 12);
    const prev12 = rows.length >= 24 ? rows.slice(rows.length - 24, rows.length - 12) : [];

    const last12Sum = sum(last12);
    const prev12Sum = sum(prev12);

    let trailing12PctVal = null;
    let trailing12TrendVal = "none";
    if (last12.length && prev12.length && prev12Sum > 0) {
      trailing12PctVal = ((last12Sum - prev12Sum) / prev12Sum) * 100;
      trailing12TrendVal = trailing12PctVal > 0 ? "up" : trailing12PctVal < 0 ? "down" : "none";
    }

    const trailing12PeriodVal =
      last12.length >= 2
        ? formatRange(last12[0].month_start, last12[last12.length - 1].month_start)
        : "Previous 12 months";

    return {
      avg6: avg6Val,
      avg6Trend: avg6TrendVal,
      avg6Pct: avg6PctVal,
      avg6Period: avg6PeriodVal,
      trailing12: last12.length ? last12Sum : null,
      trailing12Trend: trailing12TrendVal,
      trailing12Pct: trailing12PctVal,
      trailing12Period: trailing12PeriodVal,
    };
  }, [monthly]);

  const formatPill = (pct) => (pct == null ? "N/A" : `${pct > 0 ? "" : ""}${pct.toFixed(2)}%`);

  return (
    <>
      <Card
        title="Amount of Articles"
        value={postCount}
        pillText="N/A"
        trend="none"
        period="Since site opening"
      />

      <Card
        title="Avg Monthly Visitors"
        value={avg6 == null ? "—" : nf.format(Math.round(avg6))}
        pillText={formatPill(avg6Pct)}
        trend={avg6Trend}
        period={avg6Period || "Last 6 months"}
      />

      <Card
        title="Trailing Year Visitors"
        value={trailing12 == null ? "—" : nf.format(trailing12)}
        pillText={formatPill(trailing12Pct)}
        trend={trailing12Trend}
        period={trailing12Period || "Previous 12 months"}
      />

      {err && <p className="col-span-12 text-sm text-red-600">{err}</p>}
    </>
  );
};

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        {trend !== "none" && (
          <span
            className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded
${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
            {pillText}
          </span>
        )}
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
