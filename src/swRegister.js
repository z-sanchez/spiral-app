export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check for updates every 2 minutes (120000 ms)
        setInterval(() => {
          registration.update(); // Manually check for updates
          // Listen for the service worker becoming active
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            // If there's a new service worker controlling the page, reload it
            if (navigator.serviceWorker.controller) {
              window.location.reload();
            }
          });
          console.log("Service Worker updated register");
        }, 120000); // 2-minute interval
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};
