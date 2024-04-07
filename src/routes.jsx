import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import JoinScreen from "~/screens/Join-screen";
import ChatScreen from "~/screens/chat-screen";
import { useEffect } from "react";

const AppRoute = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.name) {
      navigate("/");
    } else {
      navigate("/chat");
    }
  }, [props.name]);

  return (
    <Routes>
      <Route path="/" element={<JoinScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  name: state.join_store.name,
});
export default connect(mapStateToProps)(AppRoute);
