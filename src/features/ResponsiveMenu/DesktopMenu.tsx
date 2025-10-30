import {useState, useCallback, useEffect, type ReactNode, type FC, type CSSProperties} from "react";
import { DesktopMenuContext } from "./DesktopMenuContext";
import { useLocation } from "react-router-dom";

export type DesktopMenuClasses = {
  menuItem?: string;
  menuItemActive?: string;
  subMenuTitle?: string;
  subMenuTitleActive?: string;
  subMenuChildren?: string;
  icon?: string;
  tooltip?: string;
  popoverContainer?: string;
  popoverHeader?: string;
  popoverItemContainer?: string;
  popoverArrow?: string;
  popoverStyle?: CSSProperties;
};

type DesktopMenuProps = {
  children: ReactNode;
  desktopMenuClasses?: DesktopMenuClasses;
  collapsed?: boolean;
};

export const DesktopMenu: FC<DesktopMenuProps> = ({ children, desktopMenuClasses = {} }) => {
  const location = useLocation();
  const activePath = location.pathname;

  const [activeItem, setActiveItemState] = useState<string>(activePath);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Рекурсивный поиск открытого сабменю
  const findOpenSubmenu = (nodes: ReactNode): string | null => {
    let found: string | null = null;

    const recurse = (children: ReactNode) => {
      if (found) return;
      if (!children) return;

      const arr = Array.isArray(children) ? children : [children];
      arr.forEach((child: any) => {
        if (!child || !child.props) return;
        const { id, childPaths, children: subChildren } = child.props;

        // Если текущий сабменю содержит activePath
        if (childPaths?.includes(activePath)) {
          found = id;
        }

        // Рекурсивно проверяем детей
        if (subChildren) recurse(subChildren);
      });
    };

    recurse(nodes);
    return found;
  };

  useEffect(() => {
    if (activeItem !== activePath) {
      setActiveItemState(activePath);

      const submenuToOpen = findOpenSubmenu(children);
      setOpenSubmenu(submenuToOpen);
    }
  }, [activePath, activeItem, children]);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  }, []);

  const setActiveItem = useCallback((id: string, hasSubmenu: boolean = false) => {
    setActiveItemState(id);
    if (!hasSubmenu) setOpenSubmenu(null);
  }, []);

  return (
      <DesktopMenuContext.Provider
          value={{
            activeItem,
            activePath,
            openSubmenu,
            setActiveItem,
            toggleSubmenu,
            desktopMenuClasses,
          }}
      >
        {children}
      </DesktopMenuContext.Provider>
  );
};
