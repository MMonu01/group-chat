import { Routes, Route } from "react-router-dom";

import JoinScreen from "~/screens/mobile/Join-screen";
import ChatScreen from "~/screens/mobile/chat-screen";
import LoginScreen from "~/screens/mobile/login-screen";

const MobileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<JoinScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
};

export default MobileRoute;
