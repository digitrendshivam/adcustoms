import type { LucideIcon } from "lucide-react";


export type PageKey =
  | "dashboard"
  | "clients"
  | "quotations"
  | "jobCards"
  | "staffTasks"
  | "payments"
  | "invoices"
  | "reports"
  | "settings";

export type MenuItem = {
  key: PageKey;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

export type StatCardType = {
  title: string;
  value: string;
  subText: string;
};