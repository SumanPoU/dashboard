"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CategoryExpense {
  category: string;
  total: number;
  percentage: number;
}

interface SpendingChartsProps {
  categoryExpenses: CategoryExpense[];
  isLoading: boolean;
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function SpendingCharts({
  categoryExpenses,
  isLoading,
}: SpendingChartsProps) {
  const pieData = useMemo(() => {
    return categoryExpenses.map((c) => ({
      name: c.category,
      value: Number(c.total.toFixed(2)),
    }));
  }, [categoryExpenses]);

  const barData = useMemo(() => {
    return categoryExpenses.map((c) => ({
      category: c.category,
      total: Number(c.total.toFixed(2)),
    }));
  }, [categoryExpenses]);

  const totalExpenses = useMemo(
    () => pieData.reduce((sum, item) => sum + item.value, 0),
    [pieData]
  );

  if (isLoading) {
    return (
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 h-64 bg-muted animate-pulse rounded" />
        <div className="flex-1 h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (categoryExpenses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No expense data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 my-12  gap-6 w-full">
      {/* Pie Chart */}
      <div className="lg:col-span-1 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Pie Legend */}
        {/* <div className="mt-4 space-y-1 text-sm">
          {pieData.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">
                {((item.value / totalExpenses) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Bar Chart */}
      <div className="lg:col-span-2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis dataKey="category" type="category" tick={{ fontSize: 12 }} />
            <YAxis type="number" tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
            />
            <Bar dataKey="total">
              {barData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
