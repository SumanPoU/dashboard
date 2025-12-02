import {  SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10  px-6 py-2 flex items-center border-b bg-white">
      <SidebarTrigger />
    </header>
  );
}