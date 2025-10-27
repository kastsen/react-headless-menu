import type {FC, ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";
import {useMobileMenuBarContext} from "@/features/MobileMenuBar/MobileMenuBarContext";

export type MobileMenuItemProps = {
  id: string;
  to?: string;
  children?: ReactNode;
  render?: (props: { open: boolean; isActive: boolean; handleClick: () => void }) => ReactNode;
};

export const MobileMenuItem: FC<MobileMenuItemProps> = ({ id, to, children, render }) => {
  const { toggleSubmenu, isOpen, closeSubmenu } = useMobileMenuBarContext();
  const location = useLocation();
  const open = isOpen(id);

  const handleClick = () => {
    if (render) toggleSubmenu(id); // логика для сабменю
    else closeSubmenu();
  };

  const isActive =
      !!to && (location.pathname === to || (to !== "/" && location.pathname.startsWith(`${to}/`)));

  if (render) return <>{render({ open, isActive, handleClick })}</>;

  if (to) return <Link to={to} onClick={handleClick}>{children}</Link>;

  return <div onClick={handleClick}>{children}</div>;
};