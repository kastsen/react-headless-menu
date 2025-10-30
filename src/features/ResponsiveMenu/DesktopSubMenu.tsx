import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { useDesktopMenuContext } from "./DesktopMenuContext";
import { useDesktopMenuBarContext } from "./DesktopMenuBarContext";
import { DesktopMenuPopoverContext } from "./DesktopMenuPopoverContext";
import { Link } from "react-router-dom";

type SubMenuProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  to?: string;
  children: ReactNode;
  childPaths?: string[];
};

export const DesktopSubMenu: FC<SubMenuProps> = ({
       id,
       title,
       icon,
       to = "#",
       children,
       childPaths = [],
                                                 }) => {
  const { activePath, openSubmenu, toggleSubmenu, setActiveItem, desktopMenuClasses } =
      useDesktopMenuContext();
  const { collapsed } = useDesktopMenuBarContext();

  const [showPopover, setShowPopover] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  const isChildActive = childPaths.includes(activePath);
  const isParentActive = activePath === to || isChildActive;
  const isOpen = openSubmenu === id || isParentActive;

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
    setActiveItem(to, true);
    toggleSubmenu(id);
    if (collapsed) {
      e.preventDefault();
      setShowPopover((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (collapsed) setShowPopover(true);
  };
  const handleMouseLeave = () => {
    if (collapsed) setShowPopover(false);
  };

  const content = (
      <div
          className={`${desktopMenuClasses.subMenuTitle || ""} ${
              isParentActive ? desktopMenuClasses.subMenuTitleActive || "" : ""
          }`}
      >
        {icon}
        {!collapsed && <span className="ml-2">{title}</span>}
      </div>
  );

  return (
      <div
          className="group relative"
          ref={submenuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        {to ? (
            <Link to={to} onClick={handleClick} className="block" title={collapsed ? title : undefined}>
              {content}
            </Link>
        ) : (
            <div onClick={handleClick}>{content}</div>
        )}

        {/* Popover при collapsed */}
        {collapsed && showPopover && (
            <DesktopMenuPopoverContext.Provider value={true}>
              <div className="relative z-50">
                {desktopMenuClasses.popoverArrow && <div className={desktopMenuClasses.popoverArrow}></div>}
                <div
                    className={desktopMenuClasses.popoverContainer || ""}
                    {...(desktopMenuClasses.popoverStyle ? { style: desktopMenuClasses.popoverStyle } : {})}
                >
                  {desktopMenuClasses.popoverHeader && (
                      <div className={desktopMenuClasses.popoverHeader}>{title}</div>
                  )}
                  <div className={desktopMenuClasses.popoverItemContainer || ""}>{children}</div>
                </div>
              </div>
            </DesktopMenuPopoverContext.Provider>
        )}

        {/* Подменю для десктопа, когда меню развернуто */}
        {!collapsed && isOpen && (
            <div className={desktopMenuClasses.subMenuChildren || ""}>{children}</div>
        )}
      </div>
  );
};
