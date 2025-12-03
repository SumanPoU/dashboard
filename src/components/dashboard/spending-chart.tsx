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
import { Card } from "@/components/ui/card";
import formatCurrency from "@/lib/format-currency";

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full my-6">
      {/* Pie Chart */}
      <Card className="lg:col-span-1 p-2 md:p-6 flex flex-col justify-between bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Spending Distribution
        </h3>
        <div className="h-64">
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
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bar Chart */}
      <Card className="lg:col-span-2 p-2 md:p-6 flex flex-col justify-between bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Expense by Category
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="category"
                type="category"
                tick={{ fontSize: 12 }}
              />
              <YAxis type="number" tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
      </Card>
    </div>
  );
}
