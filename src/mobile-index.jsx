import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import MobileApp from "~/screens/mobile/mobile-app";

import { store, persistor } from "~/store";

import "~/styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <MobileApp />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
