import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ChatSendNewMessages, DisconnectSocket } from "~/actions/socket-actions";
import { StartSocketConnection } from "~/actions/socket-actions";
import { GetRoomData, GetMessageData } from "~/actions/chat-actions";

const ChatScreen = (props) => {
  const [new_message, setNewMessage] = useState("");
  useEffect(() => {
    // props.name && props.Start_Socket_Connection();
    props.Get_Room_Data();
  }, []);

  const disconnectSocket = () => {
    props.Disconnect_Socket();
  };

  const SubmitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  const getMessages = (room_id) => {
    props.Get_Message_Data(room_id);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Live users {props.room_list.length}</h1>
        <h1>
          Room {props.room} Name {props.username}
        </h1>
        <button onClick={disconnectSocket}>Disconnect</button>{" "}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        Group LIST:{" "}
        {props.room_list.map((room, i) => {
          return (
            <div onClick={() => getMessages(room._id)} key={i}>
              {room.room_name}
            </div>
          );
        })}
      </div>

      <div>
        {props.messages.map((message, i) => {
          return <div key={i}>{message.message}</div>;
        })}
      </div>

      <input type="text" value={new_message} onChange={(e) => setNewMessage(e.target.value)} placeholder="new message..." />
      <button disabled={new_message.length === 0} onClick={SubmitMessage}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.login_store.username,
  room: state.login_store.room,
  messages: state.socket_store.messages,
  room_list: state.chat_store.room_list,
});
const mapDispatchToProps = (dispatch) => ({
  Disconnect_Socket: () => dispatch(DisconnectSocket()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
  Get_Room_Data: () => dispatch(GetRoomData()),
  Get_Message_Data: (room_id) => dispatch(GetMessageData(room_id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
