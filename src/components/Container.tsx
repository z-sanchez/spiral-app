import { ReactNode } from "react";

export const Container = ({ children }: { children?: ReactNode }) => {
  return <div className="w-full h-screen flex justify-center">{children}</div>;
};

export default Container;
