"use client";

import { useState, useCallback, useMemo } from "react";
import useSWR from "swr";
import TransactionTable from "./transaction-table";
import SummaryCards from "./summary-cards";
import SpendingChart from "./spending-chart";
import FilterPanel from "./filter";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface ApiResponse {
  data: Transaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  categoryExpenses: {
    category: string;
    total: number;
    percentage: number;
  }[];
}

export default function TransactionDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.append("category", selectedCategory);
    if (selectedType !== "All") params.append("type", selectedType);
    if (searchTerm) params.append("search", searchTerm);
    params.append("page", String(currentPage));
    params.append("limit", "20");
    return params.toString();
  }, [selectedCategory, selectedType, searchTerm, currentPage]);

  const { data, error, isLoading } = useSWR<ApiResponse>(
    `/api/transaction?${queryParams}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 0 }
  );

  const { data: allTransactions } = useSWR<ApiResponse>(
    "/api/transaction?limit=1000",
    fetcher
  );

  const categories = useMemo(() => {
    if (!allTransactions?.data) return [];
    return [
      "All",
      ...Array.from(new Set(allTransactions.data.map((t) => t.category))),
    ];
  }, [allTransactions]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory("All");
    setSelectedType("All");
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Transaction Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor your income and expenses with detailed analytics
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards summary={data?.summary} isLoading={isLoading} />

        <SpendingChart
          categoryExpenses={data?.categoryExpenses ?? []}
          isLoading={isLoading}
        />

        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onReset={handleResetFilters}
        />

        {/* Transaction Table */}
        <div className="my-6">
          <TransactionTable
            transactions={data?.data || []}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            totalPages={data?.meta.totalPages || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
