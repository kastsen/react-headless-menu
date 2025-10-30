import { createContext, useContext } from "react";

export const DesktopMenuPopoverContext = createContext(false);
export const useMenuPopoverContext = () => useContext(DesktopMenuPopoverContext);
