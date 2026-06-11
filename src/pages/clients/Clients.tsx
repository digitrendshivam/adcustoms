import { useMemo, useState } from "react";
import { initialClients } from "../../data/clientData";
import type { Client, ClientType } from "../../types/client.types";

type ClientFormState = {
  clientName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  address: string;
  gstNo: string;
  clientType: ClientType;
  notes: string;
};

const emptyForm: ClientFormState = {
  clientName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  address: "",
  gstNo: "",
  clientType: "Individual",
  notes: "",
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [form, setForm] = useState<ClientFormState>(emptyForm);

  const filteredClients = useMemo(() => {
    const value = searchTerm.toLowerCase();

    return clients.filter((client) => {
      return (
        client.clientName.toLowerCase().includes(value) ||
        client.mobile.includes(value) ||
        client.city.toLowerCase().includes(value) ||
        client.email.toLowerCase().includes(value)
      );
    });
  }, [clients, searchTerm]);

  const handleInputChange = (
    field: keyof ClientFormState,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddClick = () => {
    setEditingClientId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const handleEditClick = (client: Client) => {
    setEditingClientId(client.id);
    setForm({
      clientName: client.clientName,
      mobile: client.mobile,
      whatsapp: client.whatsapp,
      email: client.email,
      city: client.city,
      address: client.address,
      gstNo: client.gstNo || "",
      clientType: client.clientType,
      notes: client.notes || "",
    });
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingClientId(null);
    setForm(emptyForm);
  };

  const handleSubmit = () => {
    if (!form.clientName.trim() || !form.mobile.trim()) {
      alert("Client name and mobile number are required.");
      return;
    }

    if (editingClientId) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClientId
            ? {
                ...client,
                ...form,
              }
            : client
        )
      );
    } else {
      const newClient: Client = {
        id: Date.now(),
        ...form,
        totalJobs: 0,
        pendingAmount: 0,
      };

      setClients((prev) => [newClient, ...prev]);
    }

    handleCancel();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">
            Client Master
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer details, contact information and job history.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          + Add Client
        </button>
      </div>

      {isFormOpen && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900">
                {editingClientId ? "Edit Client" : "Add New Client"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter client information for quotations and job cards.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Client Name *
              </label>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) =>
                  handleInputChange("clientName", e.target.value)
                }
                placeholder="Enter client name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Mobile Number *
              </label>
              <input
                type="text"
                value={form.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter mobile number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) =>
                  handleInputChange("whatsapp", e.target.value)
                }
                placeholder="Enter WhatsApp number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter city"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Client Type
              </label>
              <select
                value={form.clientType}
                onChange={(e) =>
                  handleInputChange(
                    "clientType",
                    e.target.value as ClientType
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              >
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                GST Number
              </label>
              <input
                type="text"
                value={form.gstNo}
                onChange={(e) => handleInputChange("gstNo", e.target.value)}
                placeholder="Enter GST number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter full address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="md:col-span-2 xl:col-span-3">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add internal notes"
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              {editingClientId ? "Update Client" : "Save Client"}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Client List
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Total {clients.length} clients found.
            </p>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search client, mobile, city..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 lg:max-w-sm"
          />
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 lg:block">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-black text-gray-700">
                  Client
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Contact
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  City
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Type
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Jobs
                </th>
                <th className="px-5 py-4 font-black text-gray-700">
                  Pending
                </th>
                <th className="px-5 py-4 text-right font-black text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900">
                      {client.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">
                      {client.mobile}
                    </p>
                    <p className="text-xs text-gray-500">
                      WA: {client.whatsapp}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {client.city || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                      {client.clientType}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold text-gray-900">
                    {client.totalJobs}
                  </td>

                  <td className="px-5 py-4 font-bold text-red-600">
                    ₹{client.pendingAmount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleEditClick(client)}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 lg:hidden">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-black text-gray-900">
                    {client.clientName}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {client.mobile}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700">
                  {client.clientType}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">City</p>
                  <p className="font-bold text-gray-900">
                    {client.city || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Jobs</p>
                  <p className="font-bold text-gray-900">
                    {client.totalJobs}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Pending</p>
                  <p className="font-bold text-red-600">
                    ₹{client.pendingAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">WhatsApp</p>
                  <p className="font-bold text-gray-900">
                    {client.whatsapp}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleEditClick(client)}
                className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700"
              >
                Edit Client
              </button>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="rounded-2xl bg-gray-50 p-8 text-center">
            <p className="font-bold text-gray-700">No clients found.</p>
            <p className="mt-1 text-sm text-gray-500">
              Try another search or add a new client.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;