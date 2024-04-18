import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { SetUserInfo, GetUserLogout, CreateNewRoom } from "~/actions/join-actions";

const JoinScreen = (props) => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const is_btn_disabled = name.trim().length < 3;

  // const setUserInfo = () => {
  //   props.Set_User_Info(name, room);

  //   // navigate("/chat");
  // };

  const createRoom = () => {
    props.Create_New_Room(name);
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
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter room name..." />
      <button disabled={is_btn_disabled} onClick={createRoom} style={{ padding: "5px 15px" }}>
        Create Room
      </button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Set_User_Info: (name, room) => dispatch(SetUserInfo(name, room)),
  Get_User_Logout: () => dispatch(GetUserLogout()),
  Create_New_Room: (room_name) => dispatch(CreateNewRoom(room_name)),
});

export default connect(null, mapDispatchToProps)(JoinScreen);
