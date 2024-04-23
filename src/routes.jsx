import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import JoinScreen from "~/screens/desktop/Join-screen";
import ChatScreen from "~/screens/desktop/chat-screen";
import LoginScreen from "~/screens/desktop/login-screen";

const AppRoute = (props) => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<JoinScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  name: state.login_store.name,
});
export default connect(mapStateToProps)(AppRoute);
