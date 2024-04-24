import { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar } from "@chakra-ui/react";

import MessagePrompt from "~/components/desktop/message-prompt";

const MessageContainer = (props) => {
  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.message_list[0]]);

  return (
    <>
      <div className="bg-white w-full flex justify-between items-center px-8" style={{ height: "70px" }}>
        <div className="flex gap-4">
          <Avatar name="Room Image" src="" />
          <div className="text-3xl font-semibold text-green-700">{Object.hasOwn(props.current_room, "room_id") ? props.current_room.room_name : "Header"}</div>
        </div>
        <div className="">online {props.online_users}</div>{" "}
      </div>
      <div className="h-screen w-full overflow-auto flex flex-col relative">
        <div id="chat-box" className="h-full flex flex-col bg-slate-100 overflow-auto p-4">
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
    </>
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
export default connect(mapStateToProps)(MessageContainer);
