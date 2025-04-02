import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";
import { getSessionState } from "./services/sessionService"; // Import the session service to ensure it's initialized

// Initialize session state
const sessionState = getSessionState();

createApp(App).use(router).mount("#app");
