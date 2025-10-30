import type { ReactNode } from "react";
import { createContext, useContext } from "react";

export type SidebarContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  showText: (content: ReactNode) => ReactNode;
};

export const DesktopMenuBarContext = createContext<SidebarContextType | null>(null);

export const useDesktopMenuBarContext = () => {
  const context = useContext(DesktopMenuBarContext);
  if (!context) {
    throw new Error("DesktopMenuBar components must be used inside <DesktopMenuBarProvider>");
  }
  return context;
};
