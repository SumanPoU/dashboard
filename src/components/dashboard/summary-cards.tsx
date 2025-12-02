"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface SummaryProps {
  summary?: {
    totalIncome: number
    totalExpenses: number
    balance: number
  }
  isLoading?: boolean
}

export default function SummaryCards({ summary, isLoading }: SummaryProps) {
  const skeleton = <div className="h-8 bg-muted rounded animate-pulse" />

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Income */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            skeleton
          ) : (
            <div className="text-2xl font-bold text-foreground">{formatCurrency(summary?.totalIncome || 0)}</div>
          )}
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            skeleton
          ) : (
            <div className="text-2xl font-bold text-foreground">{formatCurrency(summary?.totalExpenses || 0)}</div>
          )}
        </CardContent>
      </Card>

      {/* Current Balance */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            skeleton
          ) : (
            <div className={`text-2xl font-bold ${(summary?.balance || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(summary?.balance || 0)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
