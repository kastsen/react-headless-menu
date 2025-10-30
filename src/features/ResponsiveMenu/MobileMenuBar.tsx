import type { FC, ReactNode } from "react";
import { MobileMenuBarProvider } from "./MobileMenuBarProvider.tsx";

interface MobileBottomBarProps {
  children: ReactNode;
  menuClasses?: any;
}

export const MobileMenuBar: FC<MobileBottomBarProps> = ({ children, menuClasses }) => {
  return (
      <MobileMenuBarProvider>
        <div className={menuClasses?.menuContainer || ""}>
          {children}
        </div>
      </MobileMenuBarProvider>
  );
};
