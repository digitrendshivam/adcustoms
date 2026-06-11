import type { JobCard } from "../types/jobCard.types";

export const initialJobCards: JobCard[] = [
  {
    id: 1,
    jobNo: "ADC/JOB/2026/001",
    date: "2026-06-10",
    dueDate: "2026-06-15",
    status: "Assigned",
    priority: "High",

    clientName: "Topland Engines Private",
    mobile: "8487000055",
    address: "Rajkot, Gujarat",

    vehicleType: "Car",
    make: "Mercedes-Benz",
    model: "Maybach EQS",
    colour: "Velvet Brown",
    registrationNo: "GJ03PT2601",
    kms: "12000",
    fuelLevel: "3/4",
    engineNo: "78060070232193",
    chassisNo: "W1NDX5FBXSA034426",

    observation: {
      dent: false,
      scratch: true,
      broken: false,
      missing: false,
      frontBumper: false,
      rearBumper: false,
      leftSide: true,
      rightSide: false,
      mirror: false,
      wheel: false,
    },

    workItems: [
      {
        id: 1,
        description: "Overall wash and exterior cleaning",
        assignedTo: "Vishal",
        status: "Assigned",
        notes: "Complete before evening delivery.",
      },
    ],

    estimatedAmount: 2000,
    advanceAmount: 0,
    balanceAmount: 2000,

    customerNote: "Customer requested careful wash and no harsh chemicals.",
    internalNote: "Verify all 4 side photos before starting work.",
  },
];