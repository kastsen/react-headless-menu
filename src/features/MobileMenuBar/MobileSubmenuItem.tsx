import type {FC, ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";
import {useMobileMenuBarContext} from "@/features/MobileMenuBar/MobileMenuBarContext";

type MobileSubmenuItemProps = {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
};

export const MobileSubmenuItem: FC<MobileSubmenuItemProps> = (
    {
      to,
      children,
      className,
      activeClassName,
    }) => {
  const { closeSubmenu } = useMobileMenuBarContext();
  const location = useLocation();
  const active = location.pathname === to;

  return (
      <Link
          to={to}
          onClick={closeSubmenu}
          className={`${className || ""} ${active ? activeClassName || "" : ""}`}
      >
        {children}
      </Link>
  );
};