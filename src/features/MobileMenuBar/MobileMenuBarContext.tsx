import {createContext, useContext} from "react";

export type MobileMenuBarContextType = {
  openSubmenu: string | null;
  toggleSubmenu: (id: string) => void;
  closeSubmenu: () => void;
  isOpen: (id: string) => boolean;
};

export const MobileMenuBarContext = createContext<MobileMenuBarContextType | null>(null);

export const useMobileMenuBarContext = () => {
  const ctx = useContext(MobileMenuBarContext);
  if (!ctx) throw new Error("useMobileBottomBarContext must be used inside <MobileMenuBarProvider>");
  return ctx;
};
