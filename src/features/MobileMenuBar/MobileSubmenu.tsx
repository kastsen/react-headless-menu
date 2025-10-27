import type {FC, ReactNode} from "react";
import {useMobileMenuBarContext} from "@/features/MobileMenuBar/MobileMenuBarContext";

type MobileSubmenuProps = {
  id: string;
  children: (props: { open: boolean; toggle: () => void }) => ReactNode;
};

export const MobileSubMenu: FC<MobileSubmenuProps> = ({ id, children }) => {
  const { isOpen, toggleSubmenu } = useMobileMenuBarContext();
  const open = isOpen(id);

  const toggle = () => toggleSubmenu(id);

  return <>
    {children({ open, toggle })}
  </>;
};
