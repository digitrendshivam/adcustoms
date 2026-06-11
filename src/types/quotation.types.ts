export type VehicleType = "Car" | "Bike";
export type FuelType = "Petrol" | "Diesel" | "EV" | "CNG" | "Hybrid";
export type FuelLevel = "Empty" | "1/4" | "1/2" | "3/4" | "Full";

export type QuotationStatus =
  | "Draft"
  | "Sent"
  | "Approved"
  | "Rejected"
  | "Converted to Job Card";

export type ServiceCategory =
  | "Ceramic Coating"
  | "PPF"
  | "Graphene Coating"
  | "Wrap Job"
  | "Body Kit"
  | "Lighting"
  | "Interior Modification"
  | "Bike Customization"
  | "Car Modification"
  | "Detailing"
  | "Washing"
  | "Other";

export type VerificationPhotos = {
  front: string;
  rear: string;
  left: string;
  right: string;
};

export type QuotationItem = {
  id: number;
  description: string;
  qty: number;
  rate: number;
  amount: number;
};

export type Quotation = {
  id: number;
  quotationNo: string;
  quotationDate: string;
  validTill: string;
  status: QuotationStatus;

  clientName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;

  vehicleType: VehicleType;
  make: string;
  model: string;
  variant: string;
  colour: string;
  registrationNo: string;
  kms: string;
  fuelType: FuelType;
  fuelLevel: FuelLevel;
  engineNo: string;
  chassisNo: string;

  serviceCategory: ServiceCategory;
  workSummary: string;
  conditionNotes: string;
  photos: VerificationPhotos;

  items: QuotationItem[];
  subtotal: number;
  discount: number;
  gstPercent: number;
  gstAmount: number;
  grandTotal: number;
  terms: string;
};