import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="max-w-3xl w-full mt-4 mx-6">{children}</div>
      <div className="mt-auto">
        <BottomNavBar />
      </div>
    </div>
  );
};

export { PageLayout };
