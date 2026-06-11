import { useMemo, useState } from "react";
import { initialClients } from "../../data/clientData";
import { initialQuotations } from "../../data/quotationData";
import FullLogo from "../../assets/adlogo.png";

import type {
  FuelLevel,
  FuelType,
  Quotation,
  QuotationItem,
  ServiceCategory,
  VehicleType,
  VerificationPhotos,
} from "../../types/quotation.types";

type QuotationFormState = {
  quotationDate: string;
  validTill: string;

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
  discount: number;
  gstPercent: number;
  terms: string;
};

const emptyForm: QuotationFormState = {
  quotationDate: new Date().toISOString().slice(0, 10),
  validTill: "",

  clientName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  city: "",

  vehicleType: "Car",
  make: "",
  model: "",
  variant: "",
  colour: "",
  registrationNo: "",
  kms: "",
  fuelType: "Petrol",
  fuelLevel: "1/2",
  engineNo: "",
  chassisNo: "",

  serviceCategory: "Ceramic Coating",
  workSummary: "",
  conditionNotes: "",
  photos: {
    front: "",
    rear: "",
    left: "",
    right: "",
  },

  items: [
    {
      id: Date.now(),
      description: "",
      qty: 1,
      rate: 0,
      amount: 0,
    },
  ],
  discount: 0,
  gstPercent: 0,
  terms:
    "Quotation is valid for selected validity period. Work will start after customer approval. Final amount may vary based on actual vehicle condition and additional work.",
};

const photoLabels: { key: keyof VerificationPhotos; label: string }[] = [
  { key: "front", label: "Front Side" },
  { key: "rear", label: "Rear Side" },
  { key: "left", label: "Left Side" },
  { key: "right", label: "Right Side" },
];

const Quotations = () => {
  const [quotations, setQuotations] =
    useState<Quotation[]>(initialQuotations);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [previewQuotation, setPreviewQuotation] = useState<Quotation | null>(
    null
  );
  const [form, setForm] = useState<QuotationFormState>(emptyForm);

  const filteredQuotations = useMemo(() => {
    const value = searchTerm.toLowerCase();

    return quotations.filter((quotation) => {
      return (
        quotation.quotationNo.toLowerCase().includes(value) ||
        quotation.clientName.toLowerCase().includes(value) ||
        quotation.mobile.includes(value) ||
        quotation.registrationNo.toLowerCase().includes(value) ||
        quotation.serviceCategory.toLowerCase().includes(value)
      );
    });
  }, [quotations, searchTerm]);

  const subtotal = form.items.reduce((sum, item) => sum + item.amount, 0);
  const taxableAmount = Math.max(subtotal - form.discount, 0);
  const gstAmount = (taxableAmount * form.gstPercent) / 100;
  const grandTotal = taxableAmount + gstAmount;

  const handleFormChange = (
    field: keyof QuotationFormState,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClientSelect = (clientId: string) => {
    const selectedClient = initialClients.find(
      (client) => client.id === Number(clientId)
    );

    if (!selectedClient) return;

    setForm((prev) => ({
      ...prev,
      clientName: selectedClient.clientName,
      mobile: selectedClient.mobile,
      whatsapp: selectedClient.whatsapp,
      email: selectedClient.email,
      address: selectedClient.address,
      city: selectedClient.city,
    }));
  };

  const handleItemChange = (
    itemId: number,
    field: keyof QuotationItem,
    value: string
  ) => {
    setForm((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id !== itemId) return item;

        const updatedItem = {
          ...item,
          [field]:
            field === "description" ? value : Number(value) || 0,
        };

        const qty = field === "qty" ? Number(value) || 0 : updatedItem.qty;
        const rate = field === "rate" ? Number(value) || 0 : updatedItem.rate;

        return {
          ...updatedItem,
          amount: qty * rate,
        };
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          description: "",
          qty: 1,
          rate: 0,
          amount: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (itemId: number) => {
    setForm((prev) => ({
      ...prev,
      items:
        prev.items.length === 1
          ? prev.items
          : prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const handlePhotoChange = (
    photoKey: keyof VerificationPhotos,
    file: File | null
  ) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [photoKey]: previewUrl,
      },
    }));
  };

  const handleOpenForm = () => {
    setForm(emptyForm);
    setPreviewQuotation(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const handleSaveQuotation = () => {
    if (!form.clientName.trim() || !form.mobile.trim()) {
      alert("Client name and mobile number are required.");
      return;
    }

    if (!form.make.trim() || !form.model.trim()) {
      alert("Vehicle make and model are required.");
      return;
    }

    const quotationNo = `ADC/QTN/2026/${String(quotations.length + 1).padStart(
      3,
      "0"
    )}`;

    const newQuotation: Quotation = {
      id: Date.now(),
      quotationNo,
      status: "Draft",

      ...form,

      subtotal,
      gstAmount,
      grandTotal,
    };

    setQuotations((prev) => [newQuotation, ...prev]);
    setPreviewQuotation(newQuotation);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">
            Quotation Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create quotation with client details, vehicle intake verification and service items.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          + Create Quotation
        </button>
      </div>

      {isFormOpen && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                New Quotation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Fill client, vehicle and work details in one quotation.
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

          <SectionTitle title="Client Details" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Select Existing Client
              </label>
              <select
                onChange={(e) => handleClientSelect(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              >
                <option value="">Select client</option>
                {initialClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Client Name *"
              value={form.clientName}
              onChange={(value) => handleFormChange("clientName", value)}
            />

            <InputField
              label="Mobile Number *"
              value={form.mobile}
              onChange={(value) => handleFormChange("mobile", value)}
            />

            <InputField
              label="WhatsApp Number"
              value={form.whatsapp}
              onChange={(value) => handleFormChange("whatsapp", value)}
            />

            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => handleFormChange("email", value)}
            />

            <InputField
              label="City"
              value={form.city}
              onChange={(value) => handleFormChange("city", value)}
            />

            <div className="md:col-span-2 xl:col-span-3">
              <InputField
                label="Address"
                value={form.address}
                onChange={(value) => handleFormChange("address", value)}
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
                handleFormChange("vehicleType", value as VehicleType)
              }
            />

            <InputField
              label="Make *"
              placeholder="Mercedes-Benz / Royal Enfield"
              value={form.make}
              onChange={(value) => handleFormChange("make", value)}
            />

            <InputField
              label="Model *"
              placeholder="Maybach EQS / Classic 350"
              value={form.model}
              onChange={(value) => handleFormChange("model", value)}
            />

            <InputField
              label="Variant"
              value={form.variant}
              onChange={(value) => handleFormChange("variant", value)}
            />

            <InputField
              label="Colour"
              value={form.colour}
              onChange={(value) => handleFormChange("colour", value)}
            />

            <InputField
              label="Registration No."
              value={form.registrationNo}
              onChange={(value) => handleFormChange("registrationNo", value)}
            />

            <InputField
              label="KMS"
              value={form.kms}
              onChange={(value) => handleFormChange("kms", value)}
            />

            <SelectField
              label="Fuel Type"
              value={form.fuelType}
              options={["Petrol", "Diesel", "EV", "CNG", "Hybrid"]}
              onChange={(value) =>
                handleFormChange("fuelType", value as FuelType)
              }
            />

            <SelectField
              label="Fuel Level"
              value={form.fuelLevel}
              options={["Empty", "1/4", "1/2", "3/4", "Full"]}
              onChange={(value) =>
                handleFormChange("fuelLevel", value as FuelLevel)
              }
            />

            <InputField
              label="Engine No."
              value={form.engineNo}
              onChange={(value) => handleFormChange("engineNo", value)}
            />

            <InputField
              label="Chassis No."
              value={form.chassisNo}
              onChange={(value) => handleFormChange("chassisNo", value)}
            />
          </div>

          <SectionTitle title="Service / Work Details" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <SelectField
              label="Service Category"
              value={form.serviceCategory}
              options={[
                "Ceramic Coating",
                "PPF",
                "Graphene Coating",
                "Wrap Job",
                "Body Kit",
                "Lighting",
                "Interior Modification",
                "Bike Customization",
                "Car Modification",
                "Detailing",
                "Washing",
                "Other",
              ]}
              onChange={(value) =>
                handleFormChange("serviceCategory", value as ServiceCategory)
              }
            />

            <InputField
              label="Quotation Date"
              type="date"
              value={form.quotationDate}
              onChange={(value) => handleFormChange("quotationDate", value)}
            />

            <InputField
              label="Valid Till"
              type="date"
              value={form.validTill}
              onChange={(value) => handleFormChange("validTill", value)}
            />

            <div className="md:col-span-2 xl:col-span-3">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Work Summary
              </label>
              <textarea
                value={form.workSummary}
                onChange={(e) =>
                  handleFormChange("workSummary", e.target.value)
                }
                rows={3}
                placeholder="Example: Full body PPF, ceramic coating, custom lighting, interior detailing..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="md:col-span-2 xl:col-span-3">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Vehicle Condition / Verification Notes
              </label>
              <textarea
                value={form.conditionNotes}
                onChange={(e) =>
                  handleFormChange("conditionNotes", e.target.value)
                }
                rows={3}
                placeholder="Mention scratches, dents, missing accessories, existing damages or customer notes."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <SectionTitle title="4 Side Verification Photos" />

          {<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {photoLabels.map((photo) => (
              <div
                key={photo.key}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <label className="mb-3 block text-sm font-bold text-gray-700">
                  {photo.label}
                </label>

                <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white">
                  {form.photos[photo.key] ? (
                    <img
                      src={form.photos[photo.key]}
                      alt={photo.label}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-gray-400">
                      No Image
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handlePhotoChange(
                      photo.key,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="mt-3 w-full text-sm"
                />
              </div>
            ))}
          </div> }

          <SectionTitle title="Quotation Items" />

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full min-w-[800px] border-collapse bg-white text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Work Description
                  </th>
                  <th className="px-4 py-4 font-black text-gray-700">Qty</th>
                  <th className="px-4 py-4 font-black text-gray-700">Rate</th>
                  <th className="px-4 py-4 font-black text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-right font-black text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Example: Full body PPF"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(item.id, "qty", e.target.value)
                        }
                        className="w-24 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(item.id, "rate", e.target.value)
                        }
                        className="w-32 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
                      />
                    </td>

                    <td className="px-4 py-3 font-bold text-gray-900">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
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
            onClick={handleAddItem}
            className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            + Add Item
          </button>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                value={form.terms}
                onChange={(e) => handleFormChange("terms", e.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <h4 className="text-lg font-black text-gray-900">
                Amount Summary
              </h4>

              <SummaryRow label="Subtotal" value={subtotal} />

              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) =>
                    handleFormChange("discount", Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  GST %
                </label>
                <input
                  type="number"
                  value={form.gstPercent}
                  onChange={(e) =>
                    handleFormChange("gstPercent", Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
                />
              </div>

              <SummaryRow label="GST Amount" value={gstAmount} />
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-black text-gray-900">
                  Grand Total
                </span>
                <span className="text-2xl font-black text-red-600">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
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
              onClick={handleSaveQuotation}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              Save & Preview Quotation
            </button>
          </div>
        </div>
      )}

      {previewQuotation && (
        <QuotationPreview
          quotation={previewQuotation}
          onClose={() => setPreviewQuotation(null)}
        />
      )}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Quotation List
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Total {quotations.length} quotations found.
            </p>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quotation, client, vehicle..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 lg:max-w-sm"
          />
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 xl:block">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-black text-gray-700">
                  Quotation
                </th>
                <th className="px-5 py-4 font-black text-gray-700">Client</th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Vehicle
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Service
                </th>
                <th className="px-5 py-4 font-black text-gray-700">Amount</th>
                <th className="px-5 py-4 font-black text-gray-700">Status</th>
                <th className="px-5 py-4 text-right font-black text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotations.map((quotation) => (
                <tr
                  key={quotation.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">
                      {quotation.quotationNo}
                    </p>
                    <p className="text-xs text-gray-500">
                      {quotation.quotationDate}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">
                      {quotation.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{quotation.mobile}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">
                      {quotation.make} {quotation.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {quotation.registrationNo || "-"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                      {quotation.serviceCategory}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-black text-red-600">
                    ₹{quotation.grandTotal.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                      {quotation.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setPreviewQuotation(quotation)}
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
          {filteredQuotations.map((quotation) => (
            <div
              key={quotation.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-black text-gray-900">
                    {quotation.quotationNo}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {quotation.clientName}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700">
                  {quotation.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <InfoItem
                  label="Vehicle"
                  value={`${quotation.make} ${quotation.model}`}
                />
                <InfoItem label="Service" value={quotation.serviceCategory} />
                <InfoItem
                  label="Reg No."
                  value={quotation.registrationNo || "-"}
                />
                <InfoItem
                  label="Amount"
                  value={`₹${quotation.grandTotal.toLocaleString("en-IN")}`}
                />
              </div>

              <button
                type="button"
                onClick={() => setPreviewQuotation(quotation)}
                className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700"
              >
                Preview Quotation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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

type SummaryRowProps = {
  label: string;
  value: number;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm font-bold text-gray-600">{label}</span>
      <span className="text-sm font-black text-gray-900">
        ₹{value.toLocaleString("en-IN")}
      </span>
    </div>
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

type QuotationPreviewProps = {
  quotation: Quotation;
  onClose: () => void;
};

const QuotationPreview = ({ quotation, onClose }: QuotationPreviewProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-black text-gray-900">
            Quotation Preview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Printable preview for client approval.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrint}
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
            <h2 className="text-3xl font-black text-gray-900">
              {/* AD <span className="text-red-600">Customs</span> */}
              <img src={FullLogo} alt="AD Customs" className="h-10 w-auto" />
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Car & Bike Customization | Ceramic | PPF | Modification
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-black text-gray-900">{quotation.quotationNo}</p>
            <p className="text-sm text-gray-500">
              Date: {quotation.quotationDate}
            </p>
            <p className="text-sm text-gray-500">
              Valid Till: {quotation.validTill || "-"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h4 className="font-black text-gray-900">Client Details</h4>
            <p className="mt-3 font-bold">{quotation.clientName}</p>
            <p className="text-sm text-gray-600">{quotation.mobile}</p>
            <p className="text-sm text-gray-600">{quotation.email}</p>
            <p className="text-sm text-gray-600">{quotation.address}</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h4 className="font-black text-gray-900">Vehicle Details</h4>
            <p className="mt-3 font-bold">
              {quotation.make} {quotation.model}
            </p>
            <p className="text-sm text-gray-600">
              {quotation.vehicleType} · {quotation.colour}
            </p>
            <p className="text-sm text-gray-600">
              Reg No: {quotation.registrationNo || "-"}
            </p>
            <p className="text-sm text-gray-600">
              Fuel: {quotation.fuelType} · {quotation.fuelLevel}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-black text-gray-900">Service</h4>
          <p className="mt-2 text-sm text-gray-600">
            {quotation.serviceCategory}
          </p>
          <p className="mt-1 text-sm text-gray-600">{quotation.workSummary}</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-black text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 font-black text-gray-700">Qty</th>
                <th className="px-4 py-3 font-black text-gray-700">Rate</th>
                <th className="px-4 py-3 font-black text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.qty}</td>
                  <td className="px-4 py-3">
                    ₹{item.rate.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm rounded-2xl bg-gray-50 p-5">
            <SummaryRow label="Subtotal" value={quotation.subtotal} />
            <SummaryRow label="Discount" value={quotation.discount} />
            <SummaryRow label="GST" value={quotation.gstAmount} />
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
              <span className="font-black">Grand Total</span>
              <span className="text-xl font-black text-red-600">
                ₹{quotation.grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <h4 className="font-black text-gray-900">Terms & Conditions</h4>
          <p className="mt-2 text-sm text-gray-600">{quotation.terms}</p>
        </div>
      </div>
    </div>
  );
};

export default Quotations;