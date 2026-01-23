import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { FiEye } from "react-icons/fi";
import { supabase } from "../../../db/supabase.client";

const FILL = {
  Mobile: "#459DDE",
  Desktop: "#18181b",
  Other: "#999999",
};

export const UsagePie = () => {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("umami_latest_device")
        .select("device, visitors");

      if (cancelled) return;
      if (error) setErr(error.message);
      else setRows(data ?? []);
    })();

    return () => { cancelled = true; };
  }, []);

  const data = useMemo(() => {
    const mobile = rows.find(r => r.device === "Mobile")?.visitors ?? 0;
    const desktop = rows.find(r => r.device === "Desktop")?.visitors ?? 0;
    const other = rows
      .filter(r => r.device !== "Mobile" && r.device !== "Desktop")
      .reduce((sum, r) => sum + (r.visitors ?? 0), 0);

    return [
      { name: "Mobile", value: mobile, fill: FILL.Mobile },
      { name: "Desktop", value: desktop, fill: FILL.Desktop },
      ...(other > 0 ? [{ name: "Other", value: other, fill: FILL.Other }] : []),
    ];
  }, [rows]);

  const total = useMemo(
    () => data.reduce((sum, d) => sum + (d.value ?? 0), 0),
    [data]
  );

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
    return (
      <div className="rounded border border-stone-200 bg-white px-3 py-2 text-sm shadow">
        <div className="font-medium">{name}</div>
        <div>{value} visitors</div>
        <div className="text-stone-600">{pct}%</div>
      </div>
    );
  };

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Usage
        </h3>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={renderTooltip} />
            <Legend verticalAlign="bottom" height={24} />
            <Pie
              data={data}
              innerRadius="80%"
              outerRadius="100%"
              cornerRadius={8}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              isAnimationActive
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
;
