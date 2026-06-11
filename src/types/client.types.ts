export type ClientType = "Individual" | "Company";

export type Client = {
  id: number;
  clientName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  address: string;
  gstNo?: string;
  clientType: ClientType;
  notes?: string;
  totalJobs: number;
  pendingAmount: number;
};