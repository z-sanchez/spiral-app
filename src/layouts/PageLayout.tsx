import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col border-2 border-cyan-300 ">
      <div className="max-w-3xl w-full mt-4 mx-6">{children}</div>
      <p>Testing the top</p>
      <div className="mt-auto">
        <BottomNavBar />
      </div>
      <p>Testing the bottom</p>
    </div>
  );
};

export { PageLayout };
