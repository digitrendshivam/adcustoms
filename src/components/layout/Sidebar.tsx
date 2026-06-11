import type { MenuItem, PageKey } from "../../types/common.types";
import { LogOut } from "lucide-react";

type SidebarProps = {
  menuItems: MenuItem[];
  activePage: PageKey;
  isMobileOpen: boolean;
  isCollapsed: boolean;
  isHoverOpen: boolean;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onMenuClick: (page: PageKey) => void;
  onMobileClose: () => void;
  onLogout: () => void;
};

const Sidebar = ({
  menuItems,
  activePage,
  isMobileOpen,
  isCollapsed,
  isHoverOpen,
  onHoverOpen,
  onHoverClose,
  onMenuClick,
  onMobileClose,
  onLogout,
}: SidebarProps) => {
  const isExpanded = !isCollapsed || isHoverOpen;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        onMouseEnter={onHoverOpen}
        onMouseLeave={onHoverClose}
        className={`fixed left-0 top-0 z-50 h-screen bg-[#111111] text-white transition-all duration-300
        ${isExpanded ? "lg:w-72" : "lg:w-20"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        w-72 lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <div className="whitespace-nowrap text-2xl font-black">
                  {isExpanded ? (
                    <>
                      AD <span className="text-red-500">Customs</span>
                    </>
                  ) : (
                    <span>AD</span>
                  )}
                </div>

                {isExpanded && (
                  <p className="mt-1 text-xs text-gray-400">
                    Workshop ERP Demo
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-lg px-3 py-2 text-xl hover:bg-white/10 lg:hidden"
              >
                ×
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-5">
            {menuItems.map((item) => {
              const isActive = activePage === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onMenuClick(item.key)}
                  title={item.label}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isExpanded ? "text-left" : "text-center"
                  } ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isExpanded ? item.label : item.shortLabel}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={onLogout}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white ${
                isExpanded ? "text-left" : "text-center"
              }`}
            >
                 <LogOut size={20} strokeWidth={2.4} />
              {isExpanded && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;