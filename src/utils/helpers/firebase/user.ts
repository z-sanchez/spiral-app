import { User } from "firebase/auth";

export const createUserObjectFromGoogleUser = ({
  uid,
  email,
  photoURL,
}: User) => {
  console.log({ uid, email, photoURL });
};
