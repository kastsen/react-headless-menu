import { Link, Outlet } from "react-router-dom";
import { DesktopMenuBar } from "@/features/DesktopMenuBar/DesktopMenuBar";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { DesktopMenu } from "@/features/DesktopMenuBar/DesktopMenu";
import type { DesktopMenuClasses } from "@/features/DesktopMenuBar/DesktopMenu";
import { DesktopMenuItem } from "@/features/DesktopMenuBar/DesktopMenuItem";
import { FileText, Folder, Home, Settings, SidebarClose, SidebarOpen, Users } from "lucide-react";
import { DesktopSubMenu } from "@/features/DesktopMenuBar/DesktopSubMenu";
import { MobileMenuItem } from "@/features/MobileMenuBar/MobileMenuItem";
import { MobileSubMenu } from "@/features/MobileMenuBar/MobileSubmenu";
import { MobileSubMenuOverlay } from "@/features/MobileMenuBar/MobileSubMenuOverlay";
import { MobileSubmenuItem } from "@/features/MobileMenuBar/MobileSubmenuItem";
import { MobileMenuBar } from "@/features/MobileMenuBar/MobileMenuBar";

export default function MainLayout() {
  const isMobile = useIsMobile();

  const mobileSubmenuClass =
      "py-2 w-full text-center border-b hover:bg-gray-100 rounded transition last:border-0";
  const mobileMenuActiveItemClass = "font-bold";

  return (
      <div className="flex h-screen">
        <div className="flex min-h-screen min-w-screen bg-white text-slate-900">
          {isMobile ? (
              <MobileMenuBar>
                <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-40">
                  <MobileMenuItem
                      id="home"
                      to="/"
                      render={({ isActive, handleClick }) => (
                          <Link
                              to="/"
                              onClick={handleClick}
                              className={`flex flex-col items-center cursor-pointer select-none transition ${
                                  isActive ? mobileMenuActiveItemClass : "text-gray-600"
                              }`}
                          >
                            <Home />
                            <span className="text-xs mt-1">Home</span>
                          </Link>
                      )}
                  />

                  <MobileSubMenu id="projects">
                    {({ toggle }) => (
                        <>
                          <MobileMenuItem
                              id="projects"
                              to="/projects"
                              render={({ isActive }) => (
                                  <div
                                      onClick={toggle}
                                      className={`flex flex-col items-center cursor-pointer select-none transition ${
                                          isActive ? mobileMenuActiveItemClass : "text-gray-600"
                                      }`}
                                  >
                                    <Folder />
                                    <span className="text-xs mt-1">Projects</span>
                                  </div>
                              )}
                          />
                          <MobileSubMenuOverlay
                              id="projects"
                              closeButtonClassName="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-700"
                              className="fixed bottom-16 left-0 w-full bg-white shadow-lg rounded-t-xl p-2 flex flex-col items-center z-50 animate-slide-up"
                          >
                            <MobileSubmenuItem
                                to="/projects/all"
                                className={mobileSubmenuClass}
                                activeClassName={mobileMenuActiveItemClass}
                            >
                              All Projects
                            </MobileSubmenuItem>
                            <MobileSubmenuItem
                                to="/projects/create"
                                className={mobileSubmenuClass}
                                activeClassName={mobileMenuActiveItemClass}
                            >
                              Create Project
                            </MobileSubmenuItem>
                            <MobileSubmenuItem
                                to="/projects/templates"
                                className={mobileSubmenuClass}
                                activeClassName={mobileMenuActiveItemClass}
                            >
                              Project Templates
                            </MobileSubmenuItem>
                          </MobileSubMenuOverlay>
                        </>
                    )}
                  </MobileSubMenu>

                  <MobileMenuItem
                      id="team"
                      to="/team"
                      render={({ isActive, handleClick }) => (
                          <Link
                              to="/team"
                              onClick={handleClick}
                              className={`flex flex-col items-center cursor-pointer select-none transition ${
                                  isActive ? mobileMenuActiveItemClass : "text-gray-600"
                              }`}
                          >
                            <Users />
                            <span className="text-xs mt-1">Team</span>
                          </Link>
                      )}
                  />

                  <MobileSubMenu id="reports">
                    {({ open, toggle }) => (
                        <>
                          <MobileMenuItem
                              id="reports"
                              to="/reports"
                              render={({ isActive }) => (
                                  <div
                                      onClick={toggle}
                                      className={`flex flex-col items-center cursor-pointer select-none transition ${
                                          isActive ? mobileMenuActiveItemClass : "text-gray-600"
                                      }`}
                                  >
                                    <FileText />
                                    <span className="text-xs mt-1">Reports</span>
                                  </div>
                              )}
                          />
                          {open && (
                              <MobileSubMenuOverlay
                                  id="reports"
                                  closeButtonClassName="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-700"
                                  className="fixed bottom-16 left-0 w-full bg-white shadow-lg rounded-t-xl p-2 flex flex-col items-center z-50 animate-slide-up"
                              >
                                <MobileSubmenuItem
                                    to="/reports/all"
                                    className={mobileSubmenuClass}
                                    activeClassName={mobileMenuActiveItemClass}
                                >
                                  All Reports
                                </MobileSubmenuItem>
                                <MobileSubmenuItem
                                    to="/reports/create"
                                    className={mobileSubmenuClass}
                                    activeClassName={mobileMenuActiveItemClass}
                                >
                                  Create Report
                                </MobileSubmenuItem>
                                <MobileSubmenuItem
                                    to="/reports/templates"
                                    className={mobileSubmenuClass}
                                    activeClassName={mobileMenuActiveItemClass}
                                >
                                  Report Templates
                                </MobileSubmenuItem>
                              </MobileSubMenuOverlay>
                          )}
                        </>
                    )}
                  </MobileSubMenu>

                  <MobileMenuItem
                      id="settings"
                      to="/settings"
                      render={({ isActive, handleClick }) => (
                          <Link
                              to="/settings"
                              onClick={handleClick}
                              className={`flex flex-col items-center cursor-pointer select-none transition ${
                                  isActive ? mobileMenuActiveItemClass : "text-gray-600"
                              }`}
                          >
                            <Settings />
                            <span className="text-xs mt-1">Settings</span>
                          </Link>
                      )}
                  />
                </div>
              </MobileMenuBar>
          ) : (
              <DesktopMenuBar>
                {({ collapsed, toggleCollapsed }) => {
                  const desktopMenuClasses: DesktopMenuClasses = {
                    menuItem: `px-4 py-2 rounded hover:bg-gray-100 flex items-center transition-all duration-200 ${
                        collapsed ? "justify-center" : ""
                    }`,
                    menuItemActive: "font-bold bg-gray-200",
                    subMenuTitle: `flex items-center px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition-all duration-200 ${
                        collapsed ? "justify-center" : ""
                    }`,
                    subMenuTitleActive: "font-bold bg-gray-200",
                    subMenuChildren: "",
                    icon: "w-5 h-5",
                    tooltip:
                        "absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap",
                    popoverContainer: "absolute bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 w-56",
                    popoverHeader: "px-4 py-2 border-b border-gray-100 text-gray-900 font-semibold text-sm",
                    popoverItemContainer: "flex flex-col p-1 space-y-1",
                    popoverArrow: "absolute -left-2 top-3 w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45 z-50",
                    popoverStyle: {
                      left: "calc(100% - 0.5rem)",
                      top: "-1.25rem",
                      transformOrigin: "left top",
                    },
                  };

                  return (
                      <div
                          className={`flex flex-col h-full ${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r bg-white`}
                      >
                        <DesktopMenu desktopMenuClasses={desktopMenuClasses}>
                          <DesktopMenuItem id="/" icon={<Home className={desktopMenuClasses.icon} />} label="Home" />
                          <DesktopSubMenu
                              id="projects"
                              to="/projects/all"
                              title="Projects"
                              icon={<Folder className={desktopMenuClasses.icon} />}
                              childPaths={["/projects/all", "/projects/create", "/projects/templates"]}
                          >
                            <DesktopMenuItem id="/projects/all" icon={<span className="w-3" />} label="All Projects" />
                            <DesktopMenuItem id="/projects/create" icon={<span className="w-3" />} label="Create Project" />
                            <DesktopMenuItem
                                id="/projects/templates"
                                icon={<span className="w-3" />}
                                label="Project Templates"
                            />
                          </DesktopSubMenu>

                          <DesktopMenuItem id="/team" icon={<Users className={desktopMenuClasses.icon} />} label="Team" />

                          <DesktopSubMenu
                              id="reports"
                              to="/reports/all"
                              title="Reports"
                              icon={<FileText className={desktopMenuClasses.icon} />}
                              childPaths={["/reports/all", "/reports/create", "/reports/templates"]}
                          >
                            <DesktopMenuItem id="/reports/all" icon={<span className="w-3" />} label="All Reports" />
                            <DesktopMenuItem id="/reports/create" icon={<span className="w-3" />} label="Create Report" />
                            <DesktopMenuItem
                                id="/reports/templates"
                                icon={<span className="w-3" />}
                                label="Report Templates"
                            />
                          </DesktopSubMenu>

                          <DesktopMenuItem
                              id="/settings"
                              icon={<Settings className={desktopMenuClasses.icon} />}
                              label="Settings"
                          />
                        </DesktopMenu>

                        <div className="mt-auto p-2">
                          <button
                              onClick={toggleCollapsed}
                              className="w-full flex items-center justify-center p-2 rounded hover:bg-gray-200 transition-all duration-200"
                          >
                            {collapsed ? <SidebarOpen /> : <SidebarClose />}
                          </button>
                        </div>
                      </div>
                  );
                }}
              </DesktopMenuBar>
          )}

          <main className="p-6 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
  );
}
