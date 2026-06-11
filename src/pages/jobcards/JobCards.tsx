import { useMemo, useState } from "react";
import { initialJobCards } from "../../data/jobCardData";
import FullLogo from "../../assets/adlogo.png";


import type {
  JobCard,
  JobPriority,
  JobStatus,
  JobWorkItem,
} from "../../types/jobCard.types";

type JobFormState = Omit<JobCard, "id" | "jobNo" | "balanceAmount">;

const emptyForm: JobFormState = {
  date: new Date().toISOString().slice(0, 10),
  dueDate: "",
  status: "Pending",
  priority: "Medium",

  clientName: "",
  mobile: "",
  address: "",

  vehicleType: "Car",
  make: "",
  model: "",
  colour: "",
  registrationNo: "",
  kms: "",
  fuelLevel: "1/2",
  engineNo: "",
  chassisNo: "",

  observation: {
    dent: false,
    scratch: false,
    broken: false,
    missing: false,
    frontBumper: false,
    rearBumper: false,
    leftSide: false,
    rightSide: false,
    mirror: false,
    wheel: false,
  },

  workItems: [
    {
      id: Date.now(),
      description: "",
      assignedTo: "",
      status: "Pending",
      notes: "",
    },
  ],

  estimatedAmount: 0,
  advanceAmount: 0,

  customerNote: "",
  internalNote: "",
};

const staffOptions = ["Vishal", "Rahul", "Amit", "Workshop Team"];

const JobCards = () => {
  const [jobCards, setJobCards] = useState<JobCard[]>(initialJobCards);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [previewJob, setPreviewJob] = useState<JobCard | null>(null);
  const [form, setForm] = useState<JobFormState>(emptyForm);

  const filteredJobs = useMemo(() => {
    const value = searchTerm.toLowerCase();

    return jobCards.filter((job) => {
      return (
        job.jobNo.toLowerCase().includes(value) ||
        job.clientName.toLowerCase().includes(value) ||
        job.mobile.includes(value) ||
        job.registrationNo.toLowerCase().includes(value) ||
        job.make.toLowerCase().includes(value) ||
        job.model.toLowerCase().includes(value)
      );
    });
  }, [jobCards, searchTerm]);

  const balanceAmount = Math.max(
    Number(form.estimatedAmount) - Number(form.advanceAmount),
    0
  );

  const handleChange = (
    field: keyof JobFormState,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleObservationChange = (
    field: keyof JobFormState["observation"]
  ) => {
    setForm((prev) => ({
      ...prev,
      observation: {
        ...prev.observation,
        [field]: !prev.observation[field],
      },
    }));
  };

  const handleWorkItemChange = (
    itemId: number,
    field: keyof JobWorkItem,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      workItems: prev.workItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const handleAddWorkItem = () => {
    setForm((prev) => ({
      ...prev,
      workItems: [
        ...prev.workItems,
        {
          id: Date.now(),
          description: "",
          assignedTo: "",
          status: "Pending",
          notes: "",
        },
      ],
    }));
  };

  const handleRemoveWorkItem = (itemId: number) => {
    setForm((prev) => ({
      ...prev,
      workItems:
        prev.workItems.length === 1
          ? prev.workItems
          : prev.workItems.filter((item) => item.id !== itemId),
    }));
  };

  const handleOpenForm = () => {
    setForm(emptyForm);
    setPreviewJob(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const handleSaveJob = () => {
    if (!form.clientName.trim() || !form.mobile.trim()) {
      alert("Client name and mobile number are required.");
      return;
    }

    if (!form.make.trim() || !form.model.trim()) {
      alert("Vehicle make and model are required.");
      return;
    }

    const jobNo = `ADC/JOB/2026/${String(jobCards.length + 1).padStart(
      3,
      "0"
    )}`;

    const newJob: JobCard = {
      id: Date.now(),
      jobNo,
      ...form,
      balanceAmount,
    };

    setJobCards((prev) => [newJob, ...prev]);
    setPreviewJob(newJob);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">
            Job Card / Job Work
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create digital workshop job sheet with work assignment and vehicle observation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          + Create Job Card
        </button>
      </div>

      {isFormOpen && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                New Job Card
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Digital version of AD Customs service job sheet.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseForm}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          <SectionTitle title="Job Basic Details" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <InputField
              label="Job Date"
              type="date"
              value={form.date}
              onChange={(value) => handleChange("date", value)}
            />

            <InputField
              label="Due Date"
              type="date"
              value={form.dueDate}
              onChange={(value) => handleChange("dueDate", value)}
            />

            <SelectField
              label="Status"
              value={form.status}
              options={[
                "Draft",
                "Pending",
                "Assigned",
                "In Progress",
                "Hold",
                "Completed",
                "Delivered",
                "Cancelled",
              ]}
              onChange={(value) => handleChange("status", value as JobStatus)}
            />

            <SelectField
              label="Priority"
              value={form.priority}
              options={["Low", "Medium", "High", "Urgent"]}
              onChange={(value) =>
                handleChange("priority", value as JobPriority)
              }
            />
          </div>

          <SectionTitle title="Client Details" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <InputField
              label="Client Name *"
              value={form.clientName}
              onChange={(value) => handleChange("clientName", value)}
            />

            <InputField
              label="Mobile Number *"
              value={form.mobile}
              onChange={(value) => handleChange("mobile", value)}
            />

            <div className="md:col-span-2 xl:col-span-1">
              <InputField
                label="Address"
                value={form.address}
                onChange={(value) => handleChange("address", value)}
              />
            </div>
          </div>

          <SectionTitle title="Vehicle Details" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <SelectField
              label="Vehicle Type"
              value={form.vehicleType}
              options={["Car", "Bike"]}
              onChange={(value) =>
                handleChange("vehicleType", value as "Car" | "Bike")
              }
            />

            <InputField
              label="Make *"
              value={form.make}
              placeholder="Mercedes-Benz / Royal Enfield"
              onChange={(value) => handleChange("make", value)}
            />

            <InputField
              label="Model *"
              value={form.model}
              placeholder="Maybach EQS / Classic 350"
              onChange={(value) => handleChange("model", value)}
            />

            <InputField
              label="Colour"
              value={form.colour}
              onChange={(value) => handleChange("colour", value)}
            />

            <InputField
              label="Registration No."
              value={form.registrationNo}
              onChange={(value) => handleChange("registrationNo", value)}
            />

            <InputField
              label="KMS"
              value={form.kms}
              onChange={(value) => handleChange("kms", value)}
            />

            <SelectField
              label="Fuel Level"
              value={form.fuelLevel}
              options={["Empty", "1/4", "1/2", "3/4", "Full"]}
              onChange={(value) => handleChange("fuelLevel", value)}
            />

            <InputField
              label="Engine No."
              value={form.engineNo}
              onChange={(value) => handleChange("engineNo", value)}
            />

            <InputField
              label="Chassis No."
              value={form.chassisNo}
              onChange={(value) => handleChange("chassisNo", value)}
            />
          </div>

          <SectionTitle title="Exterior Observation / Verification" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(form.observation).map(([key, value]) => (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold ${
                  value
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleObservationChange(
                      key as keyof JobFormState["observation"]
                    )
                  }
                />
                {formatObservationLabel(key)}
              </label>
            ))}
          </div>

          <SectionTitle title="Repair Instructions / Work Assignment" />

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[1000px] border-collapse bg-white text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Work Description
                  </th>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Assigned To
                  </th>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Notes
                  </th>
                  <th className="px-4 py-4 text-right font-black text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.workItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleWorkItemChange(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Example: Full body PPF installation"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={item.assignedTo}
                        onChange={(e) =>
                          handleWorkItemChange(
                            item.id,
                            "assignedTo",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      >
                        <option value="">Select Staff</option>
                        {staffOptions.map((staff) => (
                          <option key={staff} value={staff}>
                            {staff}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleWorkItemChange(
                            item.id,
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      >
                        {[
                          "Pending",
                          "Assigned",
                          "In Progress",
                          "Hold",
                          "Completed",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) =>
                          handleWorkItemChange(item.id, "notes", e.target.value)
                        }
                        placeholder="Internal instruction"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveWorkItem(item.id)}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={handleAddWorkItem}
            className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            + Add Work Item
          </button>

          <SectionTitle title="Amount & Notes" />

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Estimated Amount"
                type="number"
                value={String(form.estimatedAmount)}
                onChange={(value) =>
                  handleChange("estimatedAmount", Number(value) || 0)
                }
              />

              <InputField
                label="Advance Amount"
                type="number"
                value={String(form.advanceAmount)}
                onChange={(value) =>
                  handleChange("advanceAmount", Number(value) || 0)
                }
              />

              <div className="md:col-span-2 rounded-2xl bg-gray-50 p-5">
                <p className="text-sm font-bold text-gray-500">Balance</p>
                <p className="mt-2 text-3xl font-black text-red-600">
                  ₹{balanceAmount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <TextareaField
                label="Customer Note"
                value={form.customerNote}
                onChange={(value) => handleChange("customerNote", value)}
              />

              <TextareaField
                label="Internal Note"
                value={form.internalNote}
                onChange={(value) => handleChange("internalNote", value)}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCloseForm}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveJob}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              Save & Preview Job Card
            </button>
          </div>
        </div>
      )}

      {previewJob && (
        <JobCardPreview job={previewJob} onClose={() => setPreviewJob(null)} />
      )}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">Job Card List</h3>
            <p className="mt-1 text-sm text-gray-500">
              Total {jobCards.length} job cards found.
            </p>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search job, client, vehicle..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 lg:max-w-sm"
          />
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 xl:block">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-black text-gray-700">Job</th>
                <th className="px-5 py-4 font-black text-gray-700">Client</th>
                <th className="px-5 py-4 font-black text-gray-700">Vehicle</th>
                <th className="px-5 py-4 font-black text-gray-700">Due</th>
                <th className="px-5 py-4 font-black text-gray-700">Amount</th>
                <th className="px-5 py-4 font-black text-gray-700">Status</th>
                <th className="px-5 py-4 text-right font-black text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">{job.jobNo}</p>
                    <p className="text-xs text-gray-500">{job.date}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">{job.clientName}</p>
                    <p className="text-xs text-gray-500">{job.mobile}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">
                      {job.make} {job.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {job.registrationNo || "-"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {job.dueDate || "-"}
                  </td>

                  <td className="px-5 py-4 font-black text-red-600">
                    ₹{job.estimatedAmount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={job.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setPreviewJob(job)}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 xl:hidden">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-black text-gray-900">{job.jobNo}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {job.clientName}
                  </p>
                </div>

                <StatusBadge status={job.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <InfoItem label="Vehicle" value={`${job.make} ${job.model}`} />
                <InfoItem label="Reg No." value={job.registrationNo || "-"} />
                <InfoItem label="Due Date" value={job.dueDate || "-"} />
                <InfoItem
                  label="Amount"
                  value={`₹${job.estimatedAmount.toLocaleString("en-IN")}`}
                />
              </div>

              <button
                type="button"
                onClick={() => setPreviewJob(job)}
                className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700"
              >
                Preview Job Card
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatObservationLabel = (key: string) => {
  const labels: Record<string, string> = {
    dent: "Dent",
    scratch: "Scratch",
    broken: "Broken",
    missing: "Missing",
    frontBumper: "Front Bumper",
    rearBumper: "Rear Bumper",
    leftSide: "Left Side",
    rightSide: "Right Side",
    mirror: "Mirror",
    wheel: "Wheel",
  };

  return labels[key] || key;
};

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="mb-4 mt-8 border-b border-gray-200 pb-3">
      <h4 className="text-lg font-black text-gray-900">{title}</h4>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
};

const InputField = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
};

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TextareaField = ({ label, value, onChange }: TextareaFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

type StatusBadgeProps = {
  status: JobStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const className =
    status === "Completed" || status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "In Progress" || status === "Assigned"
      ? "bg-blue-100 text-blue-700"
      : status === "Hold" || status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
};

type InfoItemProps = {
  label: string;
  value: string;
};

const InfoItem = ({ label, value }: InfoItemProps) => {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  );
};

type JobCardPreviewProps = {
  job: JobCard;
  onClose: () => void;
};

const JobCardPreview = ({ job, onClose }: JobCardPreviewProps) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-black text-gray-900">
            Job Card Preview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Printable workshop job sheet.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            Print
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-300 bg-white p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row">
          <div>
            <img src={FullLogo} alt="AD Customs Logo" className="h-10" />
            {/* <h2 className="text-3xl font-black text-gray-900">
              AD <span className="text-red-600">Customs</span>
            </h2> */}
            <p className="mt-1 text-sm text-gray-500">
              Service Job Sheet / Workshop Job Card
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-black text-gray-900">{job.jobNo}</p>
            <p className="text-sm text-gray-500">Date: {job.date}</p>
            <p className="text-sm text-gray-500">Due: {job.dueDate || "-"}</p>
            <StatusBadge status={job.status} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h4 className="font-black text-gray-900">Customer Details</h4>
            <p className="mt-3 font-bold">{job.clientName}</p>
            <p className="text-sm text-gray-600">{job.mobile}</p>
            <p className="text-sm text-gray-600">{job.address}</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h4 className="font-black text-gray-900">Vehicle Details</h4>
            <p className="mt-3 font-bold">
              {job.make} {job.model}
            </p>
            <p className="text-sm text-gray-600">
              {job.vehicleType} · {job.colour}
            </p>
            <p className="text-sm text-gray-600">
              Reg No: {job.registrationNo || "-"}
            </p>
            <p className="text-sm text-gray-600">Fuel: {job.fuelLevel}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <h4 className="font-black text-gray-900">Vehicle Observation</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(job.observation)
              .filter(([, value]) => value)
              .map(([key]) => (
                <span
                  key={key}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                >
                  {formatObservationLabel(key)}
                </span>
              ))}

            {Object.values(job.observation).every((value) => !value) && (
              <span className="text-sm text-gray-500">
                No observation marked.
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-black text-gray-700">
                  Work Instruction
                </th>
                <th className="px-4 py-3 font-black text-gray-700">
                  Assigned To
                </th>
                <th className="px-4 py-3 font-black text-gray-700">Status</th>
                <th className="px-4 py-3 font-black text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {job.workItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.assignedTo || "-"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3">{item.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm rounded-2xl bg-gray-50 p-5">
            <AmountRow label="Estimated Amount" value={job.estimatedAmount} />
            <AmountRow label="Advance Amount" value={job.advanceAmount} />
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
              <span className="font-black">Balance</span>
              <span className="text-xl font-black text-red-600">
                ₹{job.balanceAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="border-t border-gray-300 pt-3 text-center text-sm font-bold text-gray-700">
            Customer Signature
          </div>
          <div className="border-t border-gray-300 pt-3 text-center text-sm font-bold text-gray-700">
            Advisor / Staff Signature
          </div>
        </div>
      </div>
    </div>
  );
};

type AmountRowProps = {
  label: string;
  value: number;
};

const AmountRow = ({ label, value }: AmountRowProps) => {
  return (
    <div className="mt-3 flex justify-between">
      <span className="text-sm font-bold text-gray-600">{label}</span>
      <span className="text-sm font-black text-gray-900">
        ₹{value.toLocaleString("en-IN")}
      </span>
    </div>
  );
};

export default JobCards;