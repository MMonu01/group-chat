import { Routes, Route } from "react-router-dom";

import ChatScreen from "~/screens/desktop/chat-screen";
import LoginScreen from "~/screens/desktop/login-screen";

const DesktopRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
};

export default DesktopRoute;
