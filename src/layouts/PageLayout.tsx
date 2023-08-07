import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";
import { Header } from "../components/Header";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex max-w-3xl w-full  h-full flex-col items-center">
      <Header />
      <div className="w-full px-6 overflow-y-scroll h-full">{children}</div>
      <BottomNavBar />
    </div>
  );
};

export { PageLayout };
