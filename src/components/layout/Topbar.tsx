type TopbarProps = {
  title: string;
  isCollapsed: boolean;
  onMobileMenuClick: () => void;
  onToggleCollapse: () => void;
};

const Topbar = ({
  title,
  isCollapsed,
  onMobileMenuClick,
  onToggleCollapse,
}: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuClick}
            className="rounded-xl border border-gray-200 px-3 py-2 text-xl font-black hover:bg-gray-50 lg:hidden"
          >
            ☰
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl font-black text-gray-700 hover:bg-gray-50 lg:flex"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? "☰" : "←"}
          </button>

          <div>
            <h1 className="text-xl font-black text-gray-900">{title}</h1>
            <p className="hidden text-sm text-gray-500 sm:block">
              Digitizing Job Cards, Quotations & Workshop Operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500 md:block">
            Search job card, client, quotation...
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;