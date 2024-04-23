import { useEffect, useState } from "react";
import { connect } from "react-redux";

import ChatMenu from "~/components/desktop/chat-menu";

import { ChatSendNewMessages } from "~/actions/socket-actions";
import { StartSocketConnection } from "~/actions/socket-actions";
import { GetRoomData } from "~/actions/chat-actions";

const ChatScreen = (props) => {
  const [new_message, setNewMessage] = useState("");

  useEffect(() => {
    props.Start_Socket_Connection();
    props.Get_Room_Data();
  }, []);

  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.message_list]);

  const SubmitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  const is_btn_disabled = new_message.trim().length < 1;

  return (
    <div className="w-screen h-screen bg-zinc-800 flex ">
      <div className="bg-zinc-900 text-white overflow-auto" style={{ width: "400px" }}>
        <ChatMenu />
      </div>
      <div className="bg-orange-400 w-screen flex flex-col">
        <div className="bg-white flex justify-between items-center px-8" style={{ height: "70px" }}>
          <div className="text-3xl text-green-700">{Object.hasOwn(props.current_room, "room_id") ? props.current_room.room_name : "Header"}</div>
          <div className="">online {props.online_users}</div>{" "}
        </div>
        <div className="h-screen overflow-auto flex flex-col relative">
          <div id="chat-box" className="h-full flex flex-col bg-slate-100 overflow-auto p-4">
            {props.message_list.map((message, i) => {
              return (
                <div key={i} className={`mb-4  rounded-xl px-2 py-2 sm:px-4 ${message.user_email === props.email ? "self-end bg-white" : "self-start bg-zinc-900 text-black"}`} style={{ maxWidth: "500px" }}>
                  <div className="flex">
                    <img className="-ml-1 mr-4 h-8 w-8 rounded-full" src={message.user_avatar || props.avatar} />
                    <div className="flex max-w-3xl items-center text-md text-gray-300">{message.username || "Nothing"}</div>
                  </div>
                  <div className="flex max-w-3xl items-center text-white text-sm text-gray-400  ml-12">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex rounded-lg" style={{ height: "60px" }}>
            <input
              type="text"
              id="hs-leading-button-add-on"
              name="hs-leading-button-add-on"
              value={new_message}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="py-3 px-4 block w-full border-gray-200 outline-none shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              style={{ height: "60px" }}
            />
            <button
              type="button"
              disabled={is_btn_disabled}
              onClick={SubmitMessage}
              className="py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md border border-transparent bg-teal-900 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ height: "60px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 14l11 -11"></path>
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
              {/* Button */}
            </button>
          </div>
        </div>
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
