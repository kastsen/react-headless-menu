import type {FC, ReactNode} from "react";
import {useMobileMenuBarContext} from "@/features/MobileMenuBar/MobileMenuBarContext";
import {X} from "lucide-react";

type MobileSubMenuOverlayProps = {
  id: string;
  children: ReactNode;
  className?: string;
  closeButtonClassName?: string;
  closeButtonLabel?: string;
};

export const MobileSubMenuOverlay: FC<MobileSubMenuOverlayProps> = ({ id, children, className, closeButtonClassName, closeButtonLabel='Закрыть' }) => {
  const { isOpen, toggleSubmenu } = useMobileMenuBarContext();
  const open = isOpen(id);

  if (!open) return null;

  return (
      <div className={className}>
        <button
            onClick={() => toggleSubmenu(id)}
            aria-label={closeButtonLabel}
            className={closeButtonClassName}
        >
          <X />
        </button>
        {children}
      </div>
  );
};