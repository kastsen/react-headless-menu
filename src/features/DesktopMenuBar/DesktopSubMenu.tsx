import {useEffect, useRef, useState} from "react";
import type {FC, ReactNode} from "react";
import {useDesktopMenuContext} from "@/features/DesktopMenuBar/DesktopMenuContext";
import {useDesktopMenuBarContext} from "@/features/DesktopMenuBar/DesktopMenuBarContext";
import {Link} from "react-router-dom";
import { DesktopMenuPopoverContext } from "./DesktopMenuPopoverContext";

type SubMenuProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  to: string;
  children: ReactNode;
  childPaths?: string[];
};

export const DesktopSubMenu: FC<SubMenuProps> = ({
                                                  id,
                                                  title,
                                                  icon,
                                                  to,
                                                  children,
                                                  childPaths = [],
                                                }) => {
  const { activeItem, openSubmenu, toggleSubmenu, setActiveItem, desktopMenuClasses } =
      useDesktopMenuContext();
  const { collapsed } = useDesktopMenuBarContext();

  const [showPopover, setShowPopover] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  const isChildActive = childPaths.includes(activeItem!);
  const isOpen = openSubmenu === id || isChildActive;
  const isParentActive = isChildActive || activeItem === to;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(e.target as Node)) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveItem(to, true);
    toggleSubmenu(id);
    if (collapsed) setShowPopover((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (collapsed) setShowPopover(true);
  };

  const handleMouseLeave = () => {
    if (collapsed) setShowPopover(false);
  };

  return (
      <div
          className="group relative"
          ref={submenuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        <Link
            to={to}
            onClick={handleClick}
            className="block"
            title={collapsed ? title : undefined}
        >
          <div
              className={`${desktopMenuClasses.subMenuTitle || ""} ${
                  isParentActive ? desktopMenuClasses.subMenuTitleActive || "" : ""
              }`}
          >
            {icon}
            {!collapsed && <span className="ml-2">{title}</span>}
          </div>
        </Link>

        {collapsed && !showPopover && desktopMenuClasses.tooltip && (
            <div className={desktopMenuClasses.tooltip}>{title}</div>
        )}

        {collapsed && showPopover && (
            <DesktopMenuPopoverContext.Provider value={true}>
              <div className="relative">
                {desktopMenuClasses.popoverArrow && <div className={desktopMenuClasses.popoverArrow}></div>}
                <div
                    className={desktopMenuClasses.popoverContainer || ""}
                    {...(desktopMenuClasses.popoverStyle ? { style: desktopMenuClasses.popoverStyle } : {})}
                >
                  {desktopMenuClasses.popoverHeader && (
                      <div className={desktopMenuClasses.popoverHeader}>{title}</div>
                  )}
                  <div className={desktopMenuClasses.popoverItemContainer || ""}>
                    {children}
                  </div>
                </div>
              </div>
            </DesktopMenuPopoverContext.Provider>
        )}

        {!collapsed && isOpen && (
            <div className={desktopMenuClasses.subMenuChildren || ""}>{children}</div>
        )}
      </div>
  );
};