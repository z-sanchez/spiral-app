import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";
import { Header } from "../components/Header";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col items-center">
      <Header />
      <div className="max-w-3xl w-full px-6 overflow-scroll">{children}</div>
      <BottomNavBar />
    </div>
  );
};

export { PageLayout };
