import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  ReceiptText,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import type { MenuItem } from "../types/common.types";

export const menuItems: MenuItem[] = [
  { key: "dashboard", label: "Dashboard", shortLabel: "D", icon: Home },
  { key: "clients", label: "Clients", shortLabel: "C", icon: Users },
  { key: "quotations", label: "Quotations", shortLabel: "Q", icon: FileText },
  { key: "jobCards", label: "Job Cards", shortLabel: "J", icon: ClipboardList },
  { key: "staffTasks", label: "Staff Tasks", shortLabel: "S", icon: Wrench },
  { key: "payments", label: "Payments", shortLabel: "P", icon: CreditCard },
  { key: "invoices", label: "Invoices", shortLabel: "I", icon: ReceiptText },
  { key: "reports", label: "Reports", shortLabel: "R", icon: BarChart3 },
  { key: "settings", label: "Settings", shortLabel: "ST", icon: Settings },
];