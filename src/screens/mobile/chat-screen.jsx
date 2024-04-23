import { useEffect, useState } from "react";
import { connect } from "react-redux";

import ChatMenu from "~/components/mobile/chat-menu";

import { ChatSendNewMessages } from "~/actions/socket-actions";
import { StartSocketConnection } from "~/actions/socket-actions";
import { GetRoomData } from "~/actions/chat-actions";

const ChatScreen = (props) => {
  const [new_message, setNewMessage] = useState("");

  useEffect(() => {
    props.Start_Socket_Connection();
    props.Get_Room_Data();
  }, []);

  const SubmitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  const is_btn_disabled = new_message.trim().length < 1;

  return (
    <div className="h-screen bg-zinc-800 flex ">
      <div className="bg-zinc-900 text-white overflow-auto" style={{ width: "100%" }}>
        <ChatMenu />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.login_store.avatar,
  email: state.login_store.email,
  username: state.login_store.username,
  room_list: state.chat_store.room_list,
  message_list: state.chat_store.message_list,
  current_room: state.chat_store.current_room,
  online_users: state.chat_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
  Get_Room_Data: () => dispatch(GetRoomData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
