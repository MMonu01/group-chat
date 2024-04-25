import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "@chakra-ui/react";

import MessagePrompt from "~/components/mobile/message-prompt";

import { StartSocketConnection, SocketJoinRoom } from "~/actions/socket-actions";

const MessageScreen = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.socket_id) {
      props.Start_Socket_Connection();
    }
  }, []);

  useEffect(() => {
    if (!!props.socket_id) {
      props.Socket_Join_Room();
    }
  }, [props.socket_id]);

  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.message_list[0], props.message_list.length]);

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="fixed bg-gray-200 w-screen flex flex-col items-center justify-center">
      <div className="p-4 w-full bg-white pb-2 flex justify-between items-center">
        <div className="flex gap-4 text-md font-semibold items-center">
          <Avatar name="User Image" src={""} />
          <div className="text-xl">{Object.hasOwn(props.current_room, "room_id") ? props.current_room.room_name : "Header"}</div>
        </div>

        <div onClick={() => {}} className="h-full flex items-center gap-4 cursor-pointer p-y-2">
          <div className="fixed top-2 right-4" style={{ fontSize: "10px" }}>
            online: {props.online_users}
          </div>
          <Badge onClick={goToChat} border={2} px={2} style={{ border: "1px solid gray" }}>
            groups
          </Badge>
        </div>
      </div>
      <div className="h-screen w-full overflow-auto flex flex-col relative">
        <div id="chat-box" className="h-full flex flex-col bg-slate-100 overflow-auto p-4" style={{ paddingBottom: "140px" }}>
          {props.message_list.map((message, i) => {
            return (
              <div key={i} className={`flex  ${message.user_email === props.email ? "flex-row-reverse" : "flex-row"} gap-2.5 mb-4`}>
                <Avatar name="User Image" h={9} w={9} src={message.user_avatar || props.avatar} />
                <div className="grid">
                  <h5 className={`text-gray-900 text-sm font-semibold leading-snug pb-1 ${message.user_email === props.email ? "text-end" : "text-start"}  capitalize`}>{message.username || "Stranger"}</h5>
                  <div className="w-max grid">
                    <div className="px-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                      <h5 className="text-gray-900 text-sm font-normal leading-snug text-wrap" style={{ maxWidth: "400px" }}>
                        {message.message}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <MessagePrompt />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.login_store.email,
  avatar: state.login_store.avatar,
  username: state.login_store.username,
  socket_id: state.socket_store.socket_id,
  room_list: state.chat_store.room_list,
  message_list: state.chat_store.message_list,
  current_room: state.chat_store.current_room,
  online_users: state.chat_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
