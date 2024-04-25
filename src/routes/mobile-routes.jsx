import { Routes, Route } from "react-router-dom";

import ChatScreen from "~/screens/mobile/chat-screen";
import LoginScreen from "~/screens/mobile/login-screen";
import MessageScreen from "~/screens/mobile/message-screen";

const MobileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
      <Route path="/message" element={<MessageScreen />} />
    </Routes>
  );
};

export default MobileRoute;
