import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ChatSendNewMessages, DisconnectSocket } from "~/actions/socket-actions";
import { StartSocketConnection } from "~/actions/socket-actions";

const ChatScreen = (props) => {
  const [new_message, setNewMessage] = useState("");
  useEffect(() => {
    props.name && props.Start_Socket_Connection();
  }, []);

  const disconnectSocket = () => {
    props.Disconnect_Socket();
  };

  const SubmitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Live users {props.socket_list.length}</h1>
        <h1>
          Room {props.room} Name {props.name}
        </h1>
        <button onClick={disconnectSocket}>Disconnect</button>{" "}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        USER LIST:{" "}
        {props.socket_list.map((user, i) => {
          return <div key={i}>{user.name}</div>;
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
  name: state.join_store.name,
  room: state.join_store.room,
  messages: state.socket_store.messages,
  socket_list: state.socket_store.socket_list,
});
const mapDispatchToProps = (dispatch) => ({
  Disconnect_Socket: () => dispatch(DisconnectSocket()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
