// // import { useState } from "react";

// // type StatCard = {
// //   title: string;
// //   value: string;
// //   subText: string;
// // };

// // const stats: StatCard[] = [
// //   {
// //     title: "Total Clients",
// //     value: "128",
// //     subText: "All active customers",
// //   },
// //   {
// //     title: "Today Job Cards",
// //     value: "12",
// //     subText: "Created today",
// //   },
// //   {
// //     title: "Pending Jobs",
// //     value: "18",
// //     subText: "Waiting / assigned",
// //   },
// //   {
// //     title: "Completed Jobs",
// //     value: "42",
// //     subText: "This month",
// //   },
// // ];

// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

// //   if (isLoggedIn) {
// //     return (
// //       <div className="min-h-screen bg-gray-100">
// //         <header className="border-b border-gray-200 bg-white px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-2xl font-black text-gray-900">
// //                 AD Customs ERP
// //               </h1>
// //               <p className="text-sm text-gray-500">
// //                 Dashboard overview of workshop operations
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={() => setIsLoggedIn(false)}
// //               className="rounded-xl bg-black px-5 py-2 text-sm font-bold text-white hover:bg-gray-800"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </header>

// //         <main className="p-6">
// //           <div className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-[#111111] p-6 text-white md:flex-row md:items-center">
// //             <div>
// //               <p className="text-sm font-semibold text-red-400">
// //                 Welcome back, Admin
// //               </p>
// //               <h2 className="mt-2 text-3xl font-black">
// //                 Manage Job Cards, Quotations & Staff Work
// //               </h2>
// //               <p className="mt-2 max-w-2xl text-sm text-gray-300">
// //                 Create digital job sheets, track vehicle work progress and manage
// //                 workshop operations from one place.
// //               </p>
// //             </div>

// //             <div className="flex gap-3">
// //               <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700">
// //                 + New Job Card
// //               </button>
// //               <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-100">
// //                 + Quotation
// //               </button>
// //             </div>
// //           </div>

// //           <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
// //             {stats.map((item) => (
// //               <div
// //                 key={item.title}
// //                 className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
// //               >
// //                 <p className="text-sm font-bold text-gray-500">
// //                   {item.title}
// //                 </p>
// //                 <h3 className="mt-3 text-4xl font-black text-gray-900">
// //                   {item.value}
// //                 </h3>
// //                 <p className="mt-2 text-sm text-gray-500">{item.subText}</p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-6 grid gap-6 lg:grid-cols-2">
// //             <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
// //               <h3 className="text-lg font-black text-gray-900">
// //                 Recent Job Cards
// //               </h3>

// //               <div className="mt-5 space-y-4">
// //                 <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
// //                   <div>
// //                     <p className="font-bold text-gray-900">
// //                       #JOB-3508 · Mercedes-Benz
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       Topland Engines Private · Overall Wash
// //                     </p>
// //                   </div>
// //                   <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
// //                     Pending
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
// //                   <div>
// //                     <p className="font-bold text-gray-900">
// //                       #JOB-3509 · Royal Enfield
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       Custom paint & lighting work
// //                     </p>
// //                   </div>
// //                   <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
// //                     In Progress
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
// //                   <div>
// //                     <p className="font-bold text-gray-900">
// //                       #JOB-3510 · BMW
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       Ceramic coating package
// //                     </p>
// //                   </div>
// //                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
// //                     Completed
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
// //               <h3 className="text-lg font-black text-gray-900">
// //                 Today Priority
// //               </h3>

// //               <div className="mt-5 space-y-4">
// //                 <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
// //                   <p className="font-bold text-red-700">
// //                     3 job cards due today
// //                   </p>
// //                   <p className="mt-1 text-sm text-red-600">
// //                     Check staff assignment and delivery status.
// //                   </p>
// //                 </div>

// //                 <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
// //                   <p className="font-bold text-gray-900">
// //                     5 quotations awaiting approval
// //                   </p>
// //                   <p className="mt-1 text-sm text-gray-500">
// //                     Follow up with clients via WhatsApp.
// //                   </p>
// //                 </div>

// //                 <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
// //                   <p className="font-bold text-gray-900">
// //                     ₹48,000 pending payments
// //                   </p>
// //                   <p className="mt-1 text-sm text-gray-500">
// //                     Payment collection follow-up required.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
// //       <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
// //         <div className="mb-8 text-center">
// //           <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-3xl font-black text-white">
// //             AD
// //           </div>

// //           <h1 className="text-3xl font-black text-gray-900">
// //             AD Customs ERP
// //           </h1>

// //           <p className="mt-2 text-sm text-gray-500">
// //             Login to manage job cards, quotations and workshop work.
// //           </p>
// //         </div>

// //         <form className="space-y-5">
// //           <div>
// //             <label className="mb-2 block text-sm font-bold text-gray-700">
// //               Username / Email
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Enter username"
// //               defaultValue="admin@adcustoms.in"
// //               className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //             />
// //           </div>

// //           <div>
// //             <label className="mb-2 block text-sm font-bold text-gray-700">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               placeholder="Enter password"
// //               defaultValue="123456"
// //               className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //             />
// //           </div>

// //           <button
// //             type="button"
// //             onClick={() => setIsLoggedIn(true)}
// //             className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
// //           >
// //             Login
// //           </button>
// //         </form>

// //         <div className="mt-6 rounded-2xl bg-gray-100 p-4 text-sm text-gray-600">
// //           <p className="font-bold text-gray-800">Demo Login</p>
// //           <p>Username: admin@adcustoms.in</p>
// //           <p>Password: 123456</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;



























// import { useState } from "react";

// type PageKey =
//   | "dashboard"
//   | "clients"
//   | "quotations"
//   | "jobCards"
//   | "staffTasks"
//   | "payments"
//   | "invoices"
//   | "reports"
//   | "settings";

// type MenuItem = {
//   key: PageKey;
//   label: string;
// };

// type StatCard = {
//   title: string;
//   value: string;
//   subText: string;
// };

// const menuItems: MenuItem[] = [
//   { key: "dashboard", label: "Dashboard" },
//   { key: "clients", label: "Clients" },
//   { key: "quotations", label: "Quotations" },
//   { key: "jobCards", label: "Job Cards" },
//   { key: "staffTasks", label: "Staff Tasks" },
//   { key: "payments", label: "Payments" },
//   { key: "invoices", label: "Invoices" },
//   { key: "reports", label: "Reports" },
//   { key: "settings", label: "Settings" },
// ];

// const stats: StatCard[] = [
//   {
//     title: "Total Clients",
//     value: "128",
//     subText: "All active customers",
//   },
//   {
//     title: "Today Job Cards",
//     value: "12",
//     subText: "Created today",
//   },
//   {
//     title: "Pending Jobs",
//     value: "18",
//     subText: "Waiting / assigned",
//   },
//   {
//     title: "Completed Jobs",
//     value: "42",
//     subText: "This month",
//   },
// ];

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [activePage, setActivePage] = useState<PageKey>("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

//   const activePageLabel =
//     menuItems.find((item) => item.key === activePage)?.label || "Dashboard";

//   const handleMenuClick = (page: PageKey) => {
//     setActivePage(page);
//     setSidebarOpen(false);
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
//         <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
//           <div className="mb-8 text-center">
//             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-3xl font-black text-white">
//               AD
//             </div>

//             <h1 className="text-3xl font-black text-gray-900">
//               AD Customs ERP
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Login to manage job cards, quotations and workshop work.
//             </p>
//           </div>

//           <form className="space-y-5">
//             <div>
//               <label className="mb-2 block text-sm font-bold text-gray-700">
//                 Username / Email
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 defaultValue="admin@adcustoms.in"
//                 className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-bold text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 defaultValue="123456"
//                 className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsLoggedIn(true)}
//               className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
//             >
//               Login
//             </button>
//           </form>

//           <div className="mt-6 rounded-2xl bg-gray-100 p-4 text-sm text-gray-600">
//             <p className="font-bold text-gray-800">Demo Login</p>
//             <p>Username: admin@adcustoms.in</p>
//             <p>Password: 123456</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#111111] text-white transition-transform duration-300 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-full flex-col">
//           <div className="border-b border-white/10 px-5 py-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-2xl font-black">
//                   AD <span className="text-red-500">Customs</span>
//                 </div>
//                 <p className="mt-1 text-xs text-gray-400">
//                   Workshop ERP Demo
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(false)}
//                 className="rounded-lg px-3 py-2 text-xl hover:bg-white/10 lg:hidden"
//               >
//                 ×
//               </button>
//             </div>
//           </div>

//           <nav className="flex-1 space-y-1 px-3 py-5">
//             {menuItems.map((item) => (
//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() => handleMenuClick(item.key)}
//                 className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
//                   activePage === item.key
//                     ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           <div className="border-t border-white/10 p-4">
//             <button
//               type="button"
//               onClick={() => setIsLoggedIn(false)}
//               className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       <div className="lg:pl-72">
//         <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
//           <div className="flex items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="rounded-xl border border-gray-200 px-3 py-2 text-xl font-black lg:hidden"
//               >
//                 ☰
//               </button>

//               <div>
//                 <h1 className="text-xl font-black text-gray-900">
//                   {activePageLabel}
//                 </h1>
//                 <p className="hidden text-sm text-gray-500 sm:block">
//                   Digitizing Job Cards, Quotations & Workshop Operations
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="hidden rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500 md:block">
//                 Search job card, client, quotation...
//               </div>

//               <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
//                   AD
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-bold text-gray-900">Admin</p>
//                   <p className="text-xs text-gray-500">Owner</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="p-4 sm:p-6 lg:p-8">
//           {activePage === "dashboard" && <DashboardPage />}
//           {activePage === "clients" && <SimplePage title="Client Master" />}
//           {activePage === "quotations" && <SimplePage title="Quotations" />}
//           {activePage === "jobCards" && <SimplePage title="Job Cards" />}
//           {activePage === "staffTasks" && <SimplePage title="Staff Tasks" />}
//           {activePage === "payments" && <SimplePage title="Payments" />}
//           {activePage === "invoices" && <SimplePage title="Invoices" />}
//           {activePage === "reports" && <SimplePage title="Reports" />}
//           {activePage === "settings" && <SimplePage title="Settings" />}
//         </main>
//       </div>
//     </div>
//   );
// }

// function DashboardPage() {
//   return (
//     <div>
//       <div className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-[#111111] p-6 text-white md:flex-row md:items-center">
//         <div>
//           <p className="text-sm font-semibold text-red-400">
//             Welcome back, Admin
//           </p>
//           <h2 className="mt-2 text-3xl font-black">
//             Manage Job Cards, Quotations & Staff Work
//           </h2>
//           <p className="mt-2 max-w-2xl text-sm text-gray-300">
//             Create digital job sheets, track vehicle work progress and manage
//             workshop operations from one place.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700">
//             + New Job Card
//           </button>
//           <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-100">
//             + Quotation
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((item) => (
//           <div
//             key={item.title}
//             className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
//           >
//             <p className="text-sm font-bold text-gray-500">{item.title}</p>
//             <h3 className="mt-3 text-4xl font-black text-gray-900">
//               {item.value}
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">{item.subText}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 grid gap-6 lg:grid-cols-2">
//         <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h3 className="text-lg font-black text-gray-900">
//             Recent Job Cards
//           </h3>

//           <div className="mt-5 space-y-4">
//             <JobRow
//               title="#JOB-3508 · Mercedes-Benz"
//               subtitle="Topland Engines Private · Overall Wash"
//               status="Pending"
//               color="yellow"
//             />
//             <JobRow
//               title="#JOB-3509 · Royal Enfield"
//               subtitle="Custom paint & lighting work"
//               status="In Progress"
//               color="blue"
//             />
//             <JobRow
//               title="#JOB-3510 · BMW"
//               subtitle="Ceramic coating package"
//               status="Completed"
//               color="green"
//             />
//           </div>
//         </div>

//         <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h3 className="text-lg font-black text-gray-900">Today Priority</h3>

//           <div className="mt-5 space-y-4">
//             <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
//               <p className="font-bold text-red-700">3 job cards due today</p>
//               <p className="mt-1 text-sm text-red-600">
//                 Check staff assignment and delivery status.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
//               <p className="font-bold text-gray-900">
//                 5 quotations awaiting approval
//               </p>
//               <p className="mt-1 text-sm text-gray-500">
//                 Follow up with clients via WhatsApp.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
//               <p className="font-bold text-gray-900">
//                 ₹48,000 pending payments
//               </p>
//               <p className="mt-1 text-sm text-gray-500">
//                 Payment collection follow-up required.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type JobRowProps = {
//   title: string;
//   subtitle: string;
//   status: string;
//   color: "yellow" | "blue" | "green";
// };

// function JobRow({ title, subtitle, status, color }: JobRowProps) {
//   const colorClass = {
//     yellow: "bg-yellow-100 text-yellow-700",
//     blue: "bg-blue-100 text-blue-700",
//     green: "bg-green-100 text-green-700",
//   };

//   return (
//     <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4">
//       <div>
//         <p className="font-bold text-gray-900">{title}</p>
//         <p className="text-sm text-gray-500">{subtitle}</p>
//       </div>

//       <span
//         className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${colorClass[color]}`}
//       >
//         {status}
//       </span>
//     </div>
//   );
// }

// type SimplePageProps = {
//   title: string;
// };

// function SimplePage({ title }: SimplePageProps) {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
//       <h2 className="text-2xl font-black text-gray-900">{title}</h2>
//       <p className="mt-2 text-gray-500">
//         This page is ready for next module design.
//       </p>
//     </div>
//   );
// }

// export default App;











































import { useState } from "react";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Clients from "./pages/clients/Clients";
import Quotations from "./pages/quotations/Quotations";
import JobCards from "./pages/jobcards/JobCards";
import { menuItems } from "./data/menuItems";
import type { PageKey } from "./types/common.types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<PageKey>("dashboard");

  const pageTitle =
    menuItems.find((item) => item.key === activePage)?.label || "Dashboard";

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AdminLayout
      activePage={activePage}
      pageTitle={pageTitle}
      onPageChange={setActivePage}
      onLogout={() => setIsLoggedIn(false)}
    >
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "clients" && <Clients />}
      {activePage === "quotations" && <Quotations />}
      {activePage === "jobCards" && <JobCards />}

      {activePage !== "dashboard" && activePage !== "clients" && activePage !== "quotations" && activePage !== "jobCards" &&  (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">{pageTitle}</h2>
          <p className="mt-2 text-gray-500">
            This page is ready for next module design.
          </p>
        </div>
      )}
    </AdminLayout>
  );
}

export default App;