import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";
import { Header } from "../components/Header";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col items-center">
      <div className="max-w-3xl w-full px-6">
        <>
          <Header />
          {children}
        </>
      </div>
      <div className="mt-auto w-full">
        <BottomNavBar />
      </div>
    </div>
  );
};

export { PageLayout };
