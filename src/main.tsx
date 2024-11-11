import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      // Check for updates every 1 minute
      setInterval(() => {
        console.log("CHECKING");
        registration.update();
      }, 60 * 1000); // 60 seconds * 1000 ms

      // Listen for service worker updates
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.onstatechange = () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New content is available; refresh the page or show a notification to the user
              window.location.reload();
            }
          };
        }
      };
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
