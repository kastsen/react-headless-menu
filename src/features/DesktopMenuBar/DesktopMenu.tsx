import { useState, useEffect, useCallback } from "react";
import type {ReactNode, CSSProperties, FC} from "react";
import { useLocation } from "react-router-dom";
import {DesktopMenuContext} from "@/features/DesktopMenuBar/DesktopMenuContext";

export type DesktopMenuClasses = {
  menuItem?: string;
  menuItemActive?: string;
  subMenuTitle?: string;
  subMenuTitleActive?: string;
  subMenuChildren?: string;
  icon?: string;
  tooltip?: string;
  popoverContainer?: string;
  popoverHeader?: string;
  popoverItemContainer?: string;
  popoverArrow?: string;
  popoverStyle?: CSSProperties;
};

type DesktopMenuProps = {
  children: ReactNode;
  desktopMenuClasses?: DesktopMenuClasses;
};

export const DesktopMenu: FC<DesktopMenuProps> = ({ children, desktopMenuClasses = {} }) => {
  const location = useLocation();
  const [activeItem, setActiveItemState] = useState<string>(location.pathname);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setActiveItemState(location.pathname);
  }, [location.pathname]);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  }, []);

  const setActiveItem = useCallback(
      (id: string, hasSubmenu: boolean = false) => {
        setActiveItemState(id);
        if (!hasSubmenu) setOpenSubmenu(null);
      },
      []
  );

  return (
      <DesktopMenuContext.Provider
          value={{ activeItem, openSubmenu, setActiveItem, toggleSubmenu, desktopMenuClasses: desktopMenuClasses }}
      >
        {children}
      </DesktopMenuContext.Provider>
  );
};
