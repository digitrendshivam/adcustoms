import { dashboardStats } from "../../data/dashboardData";
import StatCard from "../../components/ui/StatCard";

type JobRowProps = {
  title: string;
  subtitle: string;
  status: string;
  color: "yellow" | "blue" | "green";
};

const JobRow = ({ title, subtitle, status, color }: JobRowProps) => {
  const colorClass = {
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4">
      <div>
        <p className="font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <span
        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${colorClass[color]}`}
      >
        {status}
      </span>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-[#111111] p-6 text-white md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-red-400">
            Welcome back, Admin
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Manage Job Cards, Quotations & Staff Work
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">
            Create digital job sheets, track vehicle work progress and manage
            workshop operations from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700">
            + New Job Card
          </button>
          <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-100">
            + Quotation
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-900">
            Recent Job Cards
          </h3>

          <div className="mt-5 space-y-4">
            <JobRow
              title="#JOB-3508 · Mercedes-Benz"
              subtitle="Topland Engines Private · Overall Wash"
              status="Pending"
              color="yellow"
            />
            <JobRow
              title="#JOB-3509 · Royal Enfield"
              subtitle="Custom paint & lighting work"
              status="In Progress"
              color="blue"
            />
            <JobRow
              title="#JOB-3510 · BMW"
              subtitle="Ceramic coating package"
              status="Completed"
              color="green"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-900">Today Priority</h3>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="font-bold text-red-700">3 job cards due today</p>
              <p className="mt-1 text-sm text-red-600">
                Check staff assignment and delivery status.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-bold text-gray-900">
                5 quotations awaiting approval
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Follow up with clients via WhatsApp.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-bold text-gray-900">
                ₹48,000 pending payments
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Payment collection follow-up required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;