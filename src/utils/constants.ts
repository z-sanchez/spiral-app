export const GAME_SCHEDULE_QUERY =
  "https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2023&seasontype=2";

export const FIREBASE_CONFIGURATION = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};

export const SPIRAL_COOKIE_NAME = "spiralAppCookie";
export const SPIRAL_TEST_COOKIE_NAME = "spiralTestAppCookie";

export const NO_PICK = "no pick";
