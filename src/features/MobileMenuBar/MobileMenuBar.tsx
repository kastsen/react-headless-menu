import type {FC, ReactNode} from "react";
import { MobileMenuBarProvider } from "./MobileMenuBarProvider";

interface MobileBottomBarProps {
  children: ReactNode;
}

export const MobileMenuBar: FC<MobileBottomBarProps> = ({ children }) => {
  return <MobileMenuBarProvider>{children}</MobileMenuBarProvider>;
};
