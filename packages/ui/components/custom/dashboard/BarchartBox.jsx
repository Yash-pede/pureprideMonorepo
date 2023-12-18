"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

export default function BarchartBox({ title, value, chartData, dataKey, color }) {
  return (
    <div className="w-full h-full flex flex-col p-5">
      <h1 className="text-2xl mb-5 font-semibold flex justify-between w-full">
        {title} <span>{value}</span>
      </h1>
      <div className="w-full h-full min-h-[9.5rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
