import { useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { PageLayout } from "../layouts/PageLayout";
import { SectionIndicator } from "../components/SectionIndicator";
import { ProfileIcon } from "../components/ProfileIcon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authenticationState } from "../state/AuthState";
import { FormTextField } from "../components/Form/FormTextField";
import { DEFAULT_APP_COLOR, profileColorChoices } from "../utils/constants";
import { FormButton } from "../components/Form/FormButton";
import { Collapse } from "@mui/material";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { updateUserObjectColorAndUsername } from "../firebase/updateUser";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { notificationState } from "../state/NotificationState";
import { useNavigate } from "react-router-dom";
import { User } from "../types/Firebase";

const ProfileSettingsPage = () => {
  const [authData, setAuthData] = useRecoilState(authenticationState);
  const setNotificationState = useSetRecoilState(notificationState);

  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { color, username, id } = authData.user as User;

  const [usernameState, setUsername] = useState(username);
  const [selectedColor, setSelectedColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const navigate = useNavigate();

  const submitProfileUpdates = () => {
    if (usernameState.split(" ").join("").length === 0) {
      setNotificationState({
        show: true,
        backgroundColor: "rgb(244 63 94)",
        message: "Bad Username",
      });
      return;
    }

    updateUserObjectColorAndUsername(
      id,
      selectedColor ? selectedColor : DEFAULT_APP_COLOR,
      usernameState,
      db
    )
      .then((result) => {
        result?.success
          ? setNotificationState({
              show: true,
              backgroundColor: "rgb(34 197 94)",
              message: "Update Made Successfully",
            })
          : setNotificationState({
              show: true,
              backgroundColor: "rgb(244 63 94)",
              message: "Update Failed",
            });
      })
      .then(() => {
        if (!authData.user) return;
        setAuthData({
          ...authData,
          user: {
            ...authData.user,
            color: selectedColor,
            username: usernameState,
          },
        });
      })
      .then(() => {
        navigate("/scores");
      });
  };

  return (
    <PageLayout>
      <SectionLabel label="Profile Settings"></SectionLabel>
      {!selectedColor ? (
        <SectionIndicator
          text="Please Update Your Username and Color"
          backgroundColor={"rgb(168, 85, 247)"}
        />
      ) : null}
      <div className="flex flex-col justify-center items-center mt-8">
        <ProfileIcon
          character={usernameState[0].toLocaleUpperCase()}
          size="large"
          backgroundColor={selectedColor ? selectedColor : "rgb(168, 85, 247)"}
        />
      </div>
      <SectionLabel label="Username"></SectionLabel>
      <FormTextField
        placeholderText="username"
        value={usernameState}
        onBlur={(newUsername) => setUsername(newUsername)}
      ></FormTextField>
      <SectionLabel label="Color"></SectionLabel>
      <div>
        <Collapse in={showColorPicker} collapsedSize={60}>
          <div className="flex flex-wrap">
            {profileColorChoices.map((colorChoice) => {
              return (
                <div
                  key={colorChoice}
                  onClick={() => setSelectedColor(colorChoice)}
                  className={
                    "text-white h-10 w-10 mr-2 mb-2 flex justify-center items-center rounded-full outline-2 outline-white drop-shadow-md"
                  }
                  style={{ backgroundColor: colorChoice }}
                >
                  {selectedColor === colorChoice ? <>&#10003;</> : ""}
                </div>
              );
            })}
          </div>
        </Collapse>
        <div
          className="w-full flex justify-center items-center py-2"
          onClick={() => setShowColorPicker((prev) => !prev)}
        >
          {!showColorPicker ? (
            <>
              <p className="text-sm text-purple-500">Show More Colors</p>
              <DownArrowIcon fill="rgb(168, 85, 247)" />
            </>
          ) : (
            <UpArrowIcon fill="rgb(168, 85, 247)" />
          )}
        </div>
      </div>
      <FormButton
        text="Update Profile"
        onClick={() => submitProfileUpdates()}
      />
    </PageLayout>
  );
};

export { ProfileSettingsPage };
