import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "../../../db/supabase.client";

function monthLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleString("en-US", { month: "short" });
}

export const ActivityGraph = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: rows, error } = await supabase
        .from("umami_activity_monthly")
        .select("month_start, visitors, pageviews")
        .order("month_start", { ascending: true });

      if (cancelled) return;

      if (error) {
        setErr(error.message);
        return;
      }

      const shaped = (rows ?? []).map((r) => ({
        name: monthLabel(r.month_start),
        Visitors: r.visitors ?? 0,
        Pageviews: r.pageviews ?? 0,
      }));

      setData(shaped);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser />
          Activity
        </h3>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: -12, bottom: 0 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis className="text-xs font-bold" axisLine={false} tickLine={false} />
            <Tooltip wrapperClassName="text-sm rounded" labelClassName="text-xs text-stone-500" />

            <Line type="monotone" dataKey="Visitors" stroke="#459DDE" fill="#459DDE" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
