export type JobStatus =
  | "Draft"
  | "Pending"
  | "Assigned"
  | "In Progress"
  | "Hold"
  | "Completed"
  | "Delivered"
  | "Cancelled";

export type JobPriority = "Low" | "Medium" | "High" | "Urgent";

export type JobWorkItem = {
  id: number;
  description: string;
  assignedTo: string;
  status: JobStatus;
  notes: string;
};

export type JobCard = {
  id: number;
  jobNo: string;
  date: string;
  dueDate: string;
  status: JobStatus;
  priority: JobPriority;

  clientName: string;
  mobile: string;
  address: string;

  vehicleType: "Car" | "Bike";
  make: string;
  model: string;
  colour: string;
  registrationNo: string;
  kms: string;
  fuelLevel: string;
  engineNo: string;
  chassisNo: string;

  observation: {
    dent: boolean;
    scratch: boolean;
    broken: boolean;
    missing: boolean;
    frontBumper: boolean;
    rearBumper: boolean;
    leftSide: boolean;
    rightSide: boolean;
    mirror: boolean;
    wheel: boolean;
  };

  workItems: JobWorkItem[];

  estimatedAmount: number;
  advanceAmount: number;
  balanceAmount: number;

  customerNote: string;
  internalNote: string;
};