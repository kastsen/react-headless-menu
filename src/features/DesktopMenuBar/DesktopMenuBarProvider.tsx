import {useState} from "react";
import type {FC} from "react";
import type { ReactNode } from "react";
import { DesktopMenuBarContext } from "./DesktopMenuBarContext";

type SidebarProviderProps = {
  children: ReactNode;
};

export const DesktopMenuBarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const showText = (content: ReactNode) => (!collapsed ? content : null);

  return (
      <DesktopMenuBarContext.Provider value={{ collapsed, toggleCollapsed, showText }}>
        {children}
      </DesktopMenuBarContext.Provider>
  );
};
