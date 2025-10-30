import type { FC, ReactNode } from "react";
import { useState } from "react";
import { useDesktopMenuContext } from "./DesktopMenuContext";
import { useDesktopMenuBarContext } from "./DesktopMenuBarContext";
import { useMenuPopoverContext } from "./DesktopMenuPopoverContext";

export type MenuItemProps = {
  id: string;
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
};

export const DesktopMenuItem: FC<MenuItemProps> = ({ id, icon, label, onClick }) => {
  const { activeItem, setActiveItem, desktopMenuClasses } = useDesktopMenuContext();
  const { collapsed } = useDesktopMenuBarContext();
  const isInPopover = useMenuPopoverContext();
  const isActive = activeItem === id;

  const [hovered, setHovered] = useState(false);

  return (
      <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
      >
        <div
            onClick={() => {
              setActiveItem(id, false);
              onClick?.();
            }}
            className={`${desktopMenuClasses.menuItem || ""} ${
                isActive ? desktopMenuClasses.menuItemActive || "" : ""
            } cursor-pointer`}
        >
          {icon}
          {(!collapsed || isInPopover) && <span className="ml-2">{label}</span>}
        </div>

        {/* Tooltip для обычного пункта при collapsed и hover */}
        {collapsed && !isInPopover && hovered && desktopMenuClasses.tooltip && (
            <div className={desktopMenuClasses.tooltip}>{label}</div>
        )}
      </div>
  );
};
