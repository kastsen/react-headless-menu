import { createContext, useContext } from "react";

export type RouterMenuContextType = {
  variant: "desktop" | "mobile";
  menuClasses?: any;
};

export const RouterMenuContext = createContext<RouterMenuContextType>({
  variant: "desktop",
  menuClasses: undefined,
});

export const useRouterMenuContext = () => useContext(RouterMenuContext);
