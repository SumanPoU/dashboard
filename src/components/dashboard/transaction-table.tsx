"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import formatDate from "@/lib/format-date";
import formatCurrency from "@/lib/format-currency";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TableProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TransactionTable({
  transactions,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps) {
  if (error) {
    return (
      <Card className="p-6 border-0 shadow-sm">
        <div className="text-center text-destructive">
          Error loading transactions
        </div>
      </Card>
    );
  }

  return (
    <div className="border-0 shadow-sm">
      <div className="max-h-[500px] overflow-y-auto border rounded hide-scrollbar">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow className="*:whitespace-nowrap bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
              <TableHead className="">S.N </TableHead>
              <TableHead className="pl-4">Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // Loading skeleton
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="odd:bg-muted/50 *:whitespace-nowrap hover:bg-muted/30 transition-colors"
                >
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell className="pl-4 font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className=" font-semibold">
                    <span
                      className={`text-xs ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-foreground"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "income"
                          ? " text-green-800 dark:bg-green-900 dark:text-green-300"
                          : " text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDate(transaction.date)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-between px-6 py-2">
        <div className="hidden md:inline-block text-sm text-muted-foreground text-baseline py-2 ">
          Page {currentPage} of {totalPages}
        </div>

        {totalPages > 1 && (
          <Pagination className=" ">
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />

            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => onPageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPages)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  return null;
                }
              })}
            </PaginationContent>

            <PaginationNext
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
            />
          </Pagination>
        )}
      </div>
    </div>
  );
}
