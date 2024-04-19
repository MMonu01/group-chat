import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import JoinScreen from "~/screens/Join-screen";
import ChatScreen from "~/screens/chat-screen";
import LoginScreen from "~/screens/login-screen";

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
