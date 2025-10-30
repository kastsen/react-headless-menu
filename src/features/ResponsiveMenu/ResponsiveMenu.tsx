import { DesktopMenuBar } from "@/features/ResponsiveMenu/DesktopMenuBar";
import { MobileMenuBar } from "@/features/ResponsiveMenu/MobileMenuBar.tsx";
import { RouterMenu } from "@/features/ResponsiveMenu/RouterMenu";
import { SidebarClose, SidebarOpen } from "lucide-react";
import type {ReactNode} from "react";
import {useIsMobile} from "@/shared/hooks/useIsMobile.ts";
import type {DesktopMenuClasses} from "@/features/ResponsiveMenu/DesktopMenu.tsx";

type ResponsiveMenuProps = {
  desktopMenuClasses?: DesktopMenuClasses;
  mobileMenuClasses?: any;
  children: ReactNode;
};

export const ResponsiveMenu = ({
     desktopMenuClasses,
     mobileMenuClasses,
     children,
   }: ResponsiveMenuProps) => {

  const isMobile = useIsMobile();

  return (
      <>
        {isMobile ? (
            <MobileMenuBar menuClasses={mobileMenuClasses}>
              <RouterMenu variant="mobile" menuClasses={mobileMenuClasses}>
                {children}
              </RouterMenu>
            </MobileMenuBar>
        ) : (
            <DesktopMenuBar>
              {({ collapsed, toggleCollapsed }) => (
                  <div
                      className={`flex flex-col h-full ${
                          collapsed ? "w-16" : "w-64"
                      } transition-all duration-300 border-r bg-white`}
                  >
                    <RouterMenu
                        variant="desktop"
                        menuClasses={desktopMenuClasses}
                        collapsed={collapsed}
                    >
                      {children}
                    </RouterMenu>

                    <div className="mt-auto p-2">
                      <button
                          onClick={toggleCollapsed}
                      >
                        {collapsed ? <SidebarOpen /> : <SidebarClose />}
                      </button>
                    </div>
                  </div>
              )}
            </DesktopMenuBar>
        )}
      </>
  );
};
