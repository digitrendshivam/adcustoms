import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { menuItems } from "../../data/menuItems";
import type { PageKey } from "../../types/common.types";

// This admin layout
type AdminLayoutProps = {
  activePage: PageKey;
  pageTitle: string;
  onPageChange: (page: PageKey) => void;
  onLogout: () => void;
  children: React.ReactNode;
};


const AdminLayout = ({
  activePage,
  pageTitle,
  onPageChange,
  onLogout,
  children,
}: AdminLayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isHoverOpen, setIsHoverOpen] = useState<boolean>(false);

  const isSidebarExpanded = !isCollapsed || isHoverOpen;
  const desktopPadding = isSidebarExpanded ? "lg:pl-72" : "lg:pl-20";

  const handleMenuClick = (page: PageKey) => {
    onPageChange(page);
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        activePage={activePage}
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        isHoverOpen={isHoverOpen}
        onHoverOpen={() => setIsHoverOpen(true)}
        onHoverClose={() => setIsHoverOpen(false)}
        onMenuClick={handleMenuClick}
        onMobileClose={() => setIsMobileOpen(false)}
        onLogout={onLogout}
      />

      <div className={`transition-all duration-300 ${desktopPadding}`}>
        <Topbar
          title={pageTitle}
          isCollapsed={isCollapsed}
          onMobileMenuClick={() => setIsMobileOpen(true)}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;