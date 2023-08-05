import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full mt-4 mx-4">{children}</div>
    </div>
  );
};

export default Container;
