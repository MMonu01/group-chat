import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { SetUserInfo, GetUserLogout } from "~/actions/join-actions";

const JoinScreen = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const is_btn_disabled = name.trim().length === 0 || room === "";

  const setUserInfo = () => {
    props.Set_User_Info(name, room);

    // navigate("/chat");
  };

  const onLogout = () => {
    props
      .Get_User_Logout()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div style={{ height: "90vh", width: "100%", display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center", alignItems: "center" }}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name..." />
      <select value={room} onChange={(e) => setRoom(e.target.value)}>
        <option value="">Select Room</option>
        <option value="school"> School</option>
        <option value="college">College</option>
        <option value="office">Office</option>
      </select>
      <button disabled={is_btn_disabled} onClick={setUserInfo} style={{ padding: "5px 15px" }}>
        Join
      </button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Set_User_Info: (name, room) => dispatch(SetUserInfo(name, room)),
  Get_User_Logout: () => dispatch(GetUserLogout()),
});

export default connect(null, mapDispatchToProps)(JoinScreen);
