import {useCallback, useState} from "react";
import type {FC, ReactNode} from "react";
import { MobileMenuBarContext } from "./MobileMenuBarContext";

export const MobileMenuBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenu(prev => (prev === id ? null : id));
  }, []);

  const closeSubmenu = useCallback(() => setOpenSubmenu(null), []);
  const isOpen = useCallback((id: string) => openSubmenu === id, [openSubmenu]);

  return (
      <MobileMenuBarContext.Provider value={{ openSubmenu, toggleSubmenu, closeSubmenu, isOpen }}>
        {children}
      </MobileMenuBarContext.Provider>
  );
};