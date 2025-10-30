import { DesktopMenuBarProvider } from "./DesktopMenuBarProvider";
import { useDesktopMenuBarContext } from "./DesktopMenuBarContext";
import type { FC, ReactNode } from "react";

interface DesktopMenuBarProps {
  children: (ctx: ReturnType<typeof useDesktopMenuBarContext>) => ReactNode;
}

export const DesktopMenuBar: FC<DesktopMenuBarProps> = ({ children }) => {
  return (
      <DesktopMenuBarProvider>
        <DesktopMenuBarInner>{children}</DesktopMenuBarInner>
      </DesktopMenuBarProvider>
  );
};

const DesktopMenuBarInner: FC<{
  children: (ctx: ReturnType<typeof useDesktopMenuBarContext>) => ReactNode;
}> = ({ children }) => {
  const ctx = useDesktopMenuBarContext();
  return <>{children(ctx)}</>;
};
