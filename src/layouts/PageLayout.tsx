import { ReactNode } from "react";
import { BottomNavBar } from "../components/BottomNavBar";
import { Header } from "../components/Header";
import { NotificationLink } from "../components/NotificationLink";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationBanner } from "../components/NotificationBanner";

const PageLayout = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const numberOfPicksMissing = 0;

  const handleNotificationClick = () => {
    navigate("/");
  };

  return (
    <div className="flex max-w-3xl w-full h-full flex-col items-center">
      <NotificationBanner />
      <Header />
      <div className="w-full px-5 overflow-y-scroll h-full">{children}</div>
      {location.pathname === "/scores" && numberOfPicksMissing > 0 ? (
        <NotificationLink
          text={`Make ${numberOfPicksMissing} Picks`}
          onClick={handleNotificationClick}
        />
      ) : null}
      <BottomNavBar />
    </div>
  );
};

export { PageLayout };
