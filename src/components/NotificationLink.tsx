import { ReactComponent as NotificationBubble } from "../assets/icons/notification-bubble.svg";

export const NotificationLink = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="w-11/12 mb-2 bg-purple-500 rounded-3xl py-2 flex justify-center text-white"
    >
      <NotificationBubble className="mx-2" />
      {text}
    </div>
  );
};
