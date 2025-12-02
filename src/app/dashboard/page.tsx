import TransactionDashboard from "@/components/dashboard/transaction-dashboard";

export const metadata = {
  title: "Transaction Tracker",
  description: "Track your income and expenses with real-time analytics",
};

export default function Page() {
  return <TransactionDashboard />;
}
