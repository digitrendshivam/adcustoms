import type { Quotation } from "../types/quotation.types";

export const initialQuotations: Quotation[] = [
  {
    id: 1,
    quotationNo: "ADC/QTN/2026/001",
    quotationDate: "2026-06-10",
    validTill: "2026-06-20",
    status: "Draft",

    clientName: "Topland Engines Private",
    mobile: "8487000055",
    whatsapp: "8487000055",
    email: "topland@example.com",
    address: "Rajkot, Gujarat",
    city: "Rajkot",

    vehicleType: "Car",
    make: "Mercedes-Benz",
    model: "Maybach EQS",
    variant: "Luxury EV",
    colour: "Velvet Brown",
    registrationNo: "GJ03PT2601",
    kms: "12000",
    fuelType: "EV",
    fuelLevel: "3/4",
    engineNo: "78060070232193",
    chassisNo: "W1NDX5FBXSA034426",

    serviceCategory: "Washing",
    workSummary: "Overall wash and exterior cleaning.",
    conditionNotes: "Before work vehicle verification required from all 4 sides.",
    photos: {
      front: "",
      rear: "",
      left: "",
      right: "",
    },

    items: [
      {
        id: 1,
        description: "Overall Wash",
        qty: 1,
        rate: 2000,
        amount: 2000,
      },
    ],
    subtotal: 2000,
    discount: 0,
    gstPercent: 0,
    gstAmount: 0,
    grandTotal: 2000,
    terms: "Work will start after customer confirmation. Final amount may vary based on actual work.",
  },
];