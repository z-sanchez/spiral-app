import { atom } from "recoil";

const defaultNotificationState: {
  show: boolean;
  message: string;
  backgroundColor: string;
} = {
  show: false,
  message: "",
  backgroundColor: "",
};

export const notificationState = atom({
  key: "notificationState",
  default: defaultNotificationState,
});
