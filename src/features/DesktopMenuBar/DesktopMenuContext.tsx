import { createContext, useContext } from "react";
import type {DesktopMenuClasses} from "@/features/DesktopMenuBar/DesktopMenu";

export type MenuContextType = {
  activeItem: string | null;
  openSubmenu: string | null;
  setActiveItem: (id: string, hasSubmenu?: boolean) => void;
  toggleSubmenu: (id: string) => void;
  desktopMenuClasses: DesktopMenuClasses;
};

export const DesktopMenuContext = createContext<MenuContextType | null>(null);

export const useDesktopMenuContext = () => {
  const context = useContext(DesktopMenuContext);
  if (!context) throw new Error("DesktopMenu components must be used inside <DesktopMenu>");
  return context;
};
