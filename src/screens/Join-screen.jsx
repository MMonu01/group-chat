import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { CreateNewRoom, JoinNewRoom } from "~/actions/chat-actions";
import { GetUserLogout } from "~/actions/login-actions";

const JoinScreen = (props) => {
  const [name, setName] = useState("");
  const [room_id, setRoomId] = useState("");

  const navigate = useNavigate();

  const is_btn_disabled = name.trim().length < 3;
  const is_room_id_btn_disabled = room_id.trim().length < 3;

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

  const joinRoom = () => {
    props
      .Join_New_Room(room_id)
      .then((data) => {
        if (data.ok) {
          navigate("/chat");
        } else {
          alert("Invalid room id");
        }
      })
      .catch(() => {});
  };

  return (
    <div style={{ height: "90vh", width: "100%", display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center", alignItems: "center" }}>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter room name..." />
        <button disabled={is_btn_disabled} onClick={createRoom} className={`border-2 ${is_btn_disabled ? "cursor-not-allowed" : "cursor-pointer"} ${is_btn_disabled ? "" : "hover:bg-blue-400"}`} style={{ padding: "5px 15px" }}>
          Create Room
        </button>
      </div>

      <div>
        <input type="text" value={room_id} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter room id..." />
        <button disabled={is_room_id_btn_disabled} onClick={joinRoom} className={`border-2 ${is_room_id_btn_disabled ? "cursor-not-allowed" : "cursor-pointer"} ${is_room_id_btn_disabled ? "" : "hover:bg-blue-400"}`} style={{ padding: "5px 15px" }}>
          Join Room
        </button>
      </div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Logout: () => dispatch(GetUserLogout()),
  Join_New_Room: (room_id) => dispatch(JoinNewRoom(room_id)),
  Create_New_Room: (room_name) => dispatch(CreateNewRoom(room_name)),
});

export default connect(null, mapDispatchToProps)(JoinScreen);
