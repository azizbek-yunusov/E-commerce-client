import React from "react";
import { ThemeProvider } from "@emotion/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./redux/store";
import "./i18n";
import "./assets/styles/swipper.css";
import { theme } from "./theme";
import "moment/locale/uz-latn";
import App from "./App";
import "./index.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "moment/locale/uz-latn";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <GoogleOAuthProvider
        clientId={
          "1062466711644-41poj89urjls6ip16t1f3irv1hmhteoo.apps.googleusercontent.com"
        }
      >
        <UserProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
