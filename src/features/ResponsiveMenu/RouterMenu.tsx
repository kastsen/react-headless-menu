import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopMenu, type DesktopMenuClasses } from "./DesktopMenu";
import { DesktopMenuItem } from "./DesktopMenuItem";
import { DesktopSubMenu } from "./DesktopSubMenu";
import {
  MobileRouterMenu,
  MobileRouterMenuItem,
  MobileRouterMenuGroup,
} from "@/features/ResponsiveMenu/MobileRouterMenu.tsx";
import { RouterMenuContext, useRouterMenuContext } from "./RouterMenuContext";

export type RouterMenuProps = {
  children: ReactNode;
  menuClasses?: DesktopMenuClasses | any;
  variant?: "desktop" | "mobile";
  collapsed?: boolean;
};

export const RouterMenu = ({
     children,
     menuClasses,
     variant = "desktop",
     collapsed = false,
   }: RouterMenuProps) => {
  return (
      <RouterMenuContext.Provider value={{ variant, menuClasses }}>
        {variant === "mobile" ? (
            <MobileRouterMenu menuClasses={menuClasses}>{children}</MobileRouterMenu>
        ) : (
            <DesktopMenu desktopMenuClasses={menuClasses} collapsed={collapsed}>
              {children}
            </DesktopMenu>
        )}
      </RouterMenuContext.Provider>
  );
};

RouterMenu.Item = function RouterMenuItem({
    id,
    to,
    icon,
    label,
  }: {
  id: string;
  to: string;
  icon?: ReactNode;
  label: string;
}) {
  const { variant, menuClasses } = useRouterMenuContext();
  const navigate = useNavigate();

  if (variant === "mobile") {
    return (
        <MobileRouterMenuItem
            id={id}
            to={to}
            icon={icon}
            label={label}
            menuClasses={menuClasses}
        />
    );
  }

  return (
      <DesktopMenuItem
          id={id}
          icon={icon}
          label={label}
          onClick={() => navigate(to)}
      />
  );
};

RouterMenu.Group = function RouterMenuGroup(
    {
    id,
    title,
    icon,
    to,
    children,
    childPaths = [],
  }: {
  id: string;
  title: string;
  icon?: ReactNode;
  to: string;
  children: ReactNode;
  childPaths?: string[];
}) {
  const { variant, menuClasses } = useRouterMenuContext();

  if (variant === "mobile") {
    return (
        <MobileRouterMenuGroup
            id={id}
            title={title}
            icon={icon}
            to={to}
            menuClasses={menuClasses}
        >
          {children}
        </MobileRouterMenuGroup>
    );
  }

  return (
      <DesktopSubMenu
          id={id}
          title={title}
          icon={icon}
          to={to}
          childPaths={childPaths}
      >
        {children}
      </DesktopSubMenu>
  );
};
