import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

// Load JSON file from /public
async function loadTransactions(): Promise<Transaction[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "TrackerTransaction.json"
  );
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function GET(req: Request) {
  try {
    const allData = await loadTransactions();
    const { searchParams } = new URL(req.url);

    // Make a copy for filtering only the data
    let filteredData: Transaction[] = [...allData];

    // SEARCH
    const search = searchParams.get("search");
    if (search) {
      const term = search.toLowerCase();
      filteredData = filteredData.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      );
    }

    // CATEGORY FILTER
    const category = searchParams.get("category");
    if (category && category !== "All") {
      filteredData = filteredData.filter((t) => t.category === category);
    }

    // TYPE FILTER
    const type = searchParams.get("type");
    if (type && type !== "All") {
      filteredData = filteredData.filter((t) => t.type === type);
    }

    // DATE RANGE
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (startDate) {
      filteredData = filteredData.filter(
        (t) => new Date(t.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredData = filteredData.filter(
        (t) => new Date(t.date) <= new Date(endDate)
      );
    }

    // SORTING
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    if (sortBy) {
      filteredData.sort((a, b) => {
        let A: any = a[sortBy as keyof Transaction];
        let B: any = b[sortBy as keyof Transaction];

        if (sortBy === "amount") {
          A = Number(A);
          B = Number(B);
        }

        if (sortBy === "date") {
          return order === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        }

        if (typeof A === "string") {
          return order === "asc" ? A.localeCompare(B) : B.localeCompare(A);
        }

        return order === "asc" ? A - B : B - A;
      });
    }

    // PAGINATION
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const start = (page - 1) * limit;
    const paginatedData = filteredData.slice(start, start + limit);

    const meta = {
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };

    // SUMMARY CALCULATION (always full dataset)
    const totalIncome = allData
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = allData
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    const summary = {
      totalIncome,
      totalExpenses,
      balance,
    };

    // CATEGORY-WISE EXPENSES (always full dataset)
    const categoryMap = new Map<string, number>();
    allData
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const previous = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, previous + Number(t.amount));
      });

    const categoryExpenses = Array.from(categoryMap, ([category, total]) => {
      const percentage =
        totalExpenses > 0
          ? Number(((total / totalExpenses) * 100).toFixed(2))
          : 0;

      return { category, total, percentage };
    });

    // RESPONSE
    return NextResponse.json({
      data: paginatedData,
      meta,
      summary,
      categoryExpenses,
    });
  } catch (err) {
    console.error("Error loading transactions:", err);
    return NextResponse.json(
      { error: "Failed to load transactions" },
      { status: 500 }
    );
  }
}
