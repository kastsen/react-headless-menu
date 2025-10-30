import { RouterMenu } from "@/features/ResponsiveMenu/RouterMenu";
import {
  Home,
  Folder,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import {ResponsiveMenu} from "@/features/ResponsiveMenu/ResponsiveMenu.tsx";

export default function MainLayout() {
  const desktopMenuClasses = {
    menuItem: `px-4 py-2 rounded hover:bg-gray-100 flex items-center transition-all duration-200`,
    menuItemActive: "font-bold bg-gray-200",
    subMenuTitle: `flex items-center px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition-all duration-200`,
    subMenuTitleActive: "font-bold bg-gray-200",
    icon: "w-5 h-5",
    popoverContainer: "absolute bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 w-56",
  };

  const mobileMenuClasses = {
    menuContainer: "fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-40",
    menuItem: "flex flex-col items-center cursor-pointer select-none transition text-gray-600",
    menuItemActive: "font-bold text-blue-600",
    submenuOverlay: "fixed bottom-0 left-0 w-full bg-white shadow-xl rounded-t-2xl p-4 z-50 animate-slide-up",
    closeButtonClassName: "absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-700",
  };

  return (
      <div className="flex h-screen">
        <div className="flex min-h-screen min-w-screen bg-white text-slate-900">
          <ResponsiveMenu desktopMenuClasses={desktopMenuClasses} mobileMenuClasses={mobileMenuClasses}>
            <RouterMenu.Item id="/" to="/" icon={<Home />} label="Home" />

            <RouterMenu.Group
                id="projects"
                title="Projects"
                icon={<Folder />}
                to="/projects/all"
                childPaths={["/projects/all", "/projects/create", "/projects/templates"]}
            >
              <RouterMenu.Item id="/projects/all" to="/projects/all" label="All Projects" />
              <RouterMenu.Item id="/projects/create" to="/projects/create" label="Create Project" />
              <RouterMenu.Item id="/projects/templates" to="/projects/templates" label="Project Templates" />
            </RouterMenu.Group>

            <RouterMenu.Item id="/team" to="/team" icon={<Users />} label="Team" />

            <RouterMenu.Group
                id="reports"
                title="Reports"
                icon={<FileText />}
                to="/reports/all"
                childPaths={["/reports/all", "/reports/create", "/reports/templates"]}
            >
              <RouterMenu.Item id="/reports/all" to="/reports/all" label="All Reports" />
              <RouterMenu.Item id="/reports/create" to="/reports/create" label="Create Report" />
              <RouterMenu.Item id="/reports/templates" to="/reports/templates" label="Report Templates" />
            </RouterMenu.Group>

            <RouterMenu.Item id="/settings" to="/settings" icon={<Settings />} label="Settings" />
          </ResponsiveMenu>

        </div>
      </div>
  );
}
