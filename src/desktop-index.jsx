import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { store, persistor } from "~/store";
import DesktopApp from "~/screens/desktop/desktop-app.jsx";

import "~/styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <DesktopApp />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
