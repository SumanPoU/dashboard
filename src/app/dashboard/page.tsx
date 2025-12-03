import TransactionDashboard from "@/components/dashboard/transaction-dashboard";
import { Suspense } from "react";
export const metadata = {
  title: "Transaction Tracker",
  description: "Track your income and expenses with real-time analytics",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<></>}>
      <TransactionDashboard />
    </Suspense>
  );
}
