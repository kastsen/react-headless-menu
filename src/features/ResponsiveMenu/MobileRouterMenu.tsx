import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileSubMenuOverlay } from "./MobileSubMenuOverlay.tsx";
import {MobileSubMenu} from "@/features/ResponsiveMenu/MobileSubmenu.tsx";
import {useMobileMenuBarContext} from "@/features/ResponsiveMenu/MobileMenuBarContext.tsx";

export const MobileRouterMenu = ({
     children,
     menuClasses,
   }: {
  children: ReactNode;
  menuClasses?: any;
}) => {
  return <div className={menuClasses?.menuContainer}>{children}</div>;
};

export const MobileRouterMenuItem = ({
     to,
     icon,
     label,
     menuClasses,
     childPaths = [],
   }: {
  id: string;
  to: string;
  icon?: ReactNode;
  label: string;
  menuClasses?: any;
  childPaths?: string[];
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { closeSubmenu } = useMobileMenuBarContext();

  const isActive =
      location.pathname === to || childPaths.some(path => location.pathname.startsWith(path));

  const handleClick = () => {
    navigate(to);
    closeSubmenu();
  };

  return (
      <div
          onClick={handleClick}
          className={`${menuClasses?.menuItem} ${
              isActive ? menuClasses?.menuItemActive : ""
          } `}
      >
        <span className={`${isActive ? menuClasses?.menuItemActive : ""}`}>
        {icon}
      </span>
        <span className={`${isActive ? menuClasses?.menuItemActive : ""}`}>
        {label}
      </span>
      </div>
  );
};


export const MobileRouterMenuGroup = ({
      id,
      title,
      icon,
      to,
      children,
      menuClasses,
      childPaths = [],
    }: {
  id: string;
  title: string;
  icon?: ReactNode;
  to: string;
  children: ReactNode;
  menuClasses?: any;
  childPaths?: string[];
}) => {
  const location = useLocation();

  const isActive =
      location.pathname === to || childPaths.some(path => location.pathname.startsWith(path));

  return (
      <MobileSubMenu id={id}>
        {({ open, toggle }) => (
            <>
              <div
                  onClick={toggle}
                  className={`${menuClasses?.menuItem} ${
                      isActive ? menuClasses?.menuItemActive : ""
                  } flex flex-col items-center justify-center`}
              >
                {icon}
                {title}
              </div>

              {open && (
                  <MobileSubMenuOverlay
                      id={id}
                      className={menuClasses?.submenuOverlay}
                      closeButtonClassName={menuClasses?.closeButtonClassName}
                  >
                    {children}
                  </MobileSubMenuOverlay>
              )}
            </>
        )}
      </MobileSubMenu>
  );
};
