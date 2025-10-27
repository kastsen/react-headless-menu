import type {FC, ReactNode} from "react";
import {useDesktopMenuContext} from "@/features/DesktopMenuBar/DesktopMenuContext";
import {useDesktopMenuBarContext} from "@/features/DesktopMenuBar/DesktopMenuBarContext";
import {useMenuPopoverContext} from "@/features/DesktopMenuBar/DesktopMenuPopoverContext";
import {Link} from "react-router-dom";

export type MenuItemProps = {
  id: string;
  icon?: ReactNode;
  label: string;
};

export const DesktopMenuItem: FC<MenuItemProps> = ({ id, icon, label }) => {
  const { activeItem, setActiveItem, desktopMenuClasses } = useDesktopMenuContext();
  const { collapsed } = useDesktopMenuBarContext();
  const isInPopover = useMenuPopoverContext();
  const isActive = activeItem === id;

  return (
      <Link
          to={id}
          onClick={() => setActiveItem(id, false)}
          className="group relative block"
          title={collapsed && !isInPopover ? label : undefined}
      >
        <div
            className={`${desktopMenuClasses.menuItem || ""} ${
                isActive ? desktopMenuClasses.menuItemActive || "" : ""
            }`}
        >
          {icon}
          {(!collapsed || isInPopover) && <span className="ml-2">{label}</span>}
        </div>

        {collapsed && !isInPopover && desktopMenuClasses.tooltip && (
            <div className={desktopMenuClasses.tooltip}>{label}</div>
        )}
      </Link>
  );
};