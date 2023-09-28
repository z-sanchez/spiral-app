import { useRecoilState } from "recoil";
import { notificationState } from "../state/NotificationState";
import { useEffect, useState } from "react";

const NotificationBanner = () => {
  const [notification, setBanner] = useRecoilState(notificationState);
  const [fadeOutAnimation, setFadeOutAnimation] = useState(notification.show);

  const bannerText = notification.message;

  useEffect(() => {
    if (!fadeOutAnimation) {
      setTimeout(() => {
        setFadeOutAnimation(true);
      }, 1500);
    }
  });

  return notification.message ? (
    <div
      onClick={() =>
        setBanner({
          show: false,
          message: "",
          backgroundColor: notification.backgroundColor,
        })
      }
      className={
        "flex justify-center w-full transition-all absolute " +
        (fadeOutAnimation ? "fadeOut" : "")
      }
      style={{ backgroundColor: notification.backgroundColor ?? "" }}
      onAnimationEnd={() => {
        setBanner({
          show: false,
          message: "",
          backgroundColor: notification.backgroundColor,
        });
        setFadeOutAnimation(false);
      }}
    >
      <p className="text-xs py-1 text-white m-0 p-0">
        {bannerText ? bannerText : ""}
      </p>
    </div>
  ) : null;
};

export { NotificationBanner };
