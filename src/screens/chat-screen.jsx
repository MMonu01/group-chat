import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ChatSendNewMessages, DisconnectSocket } from "~/actions/socket-actions";
import { StartSocketConnection, SocketJoinRoom } from "~/actions/socket-actions";
import { GetRoomData, GetMessageData, SetCurrentRoom, CreateNewRoom, JoinNewRoom } from "~/actions/chat-actions";

const ChatScreen = (props) => {
  const [new_message, setNewMessage] = useState("");
  const [new_room, setNewRoom] = useState("");
  const [room_id, setRoomId] = useState("");

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

  const disconnectSocket = () => {
    props.Disconnect_Socket();
  };

  const SubmitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  const joinRoom = () => {
    props.Join_New_Room(room_id);
    setRoomId("");
  };

  const is_btn_disabled = new_message.trim().length < 1;
  const is_create_room_disabled = new_room.trim().length < 3;
  const is_room_id_btn_disabled = room_id.trim().length < 24;

  const getCurrentRoomData = (room) => {
    props.Set_Current_Room(room);
    // props.Get_Message_Data(room.room_id);
    props.Socket_Join_Room();
  };

  const createRoom = () => {
    props.Create_New_Room(new_room);
    setNewRoom("");
  };

  return (
    <div className="w-screen h-screen bg-zinc-800 flex ">
      <div className="bg-green-300" style={{ width: "500px" }}>
        <div className="text-3xl font-extrabold text-gray-900 p-4">Group List: </div>
        <div className="flex flex-col items-center gap-4">
          {props.room_list.map((room, i) => {
            return (
              <div onClick={() => getCurrentRoomData(room)} className="bg-blue-300 w-full flex justify-center p-4 hover:bg-blue-500 cursor-pointer " key={i}>
                {room.room_name}
              </div>
            );
          })}

          <div>
            <input type="text" value={new_room} onChange={(e) => setNewRoom(e.target.value)} placeholder="Enter group name..." />
            <button disabled={is_create_room_disabled} onClick={createRoom} className={`border-2 ${is_create_room_disabled ? "cursor-not-allowed" : "cursor-pointer"} ${is_create_room_disabled ? "" : "hover:bg-blue-400"}`} style={{ padding: "5px 15px" }}>
              Create New Group
            </button>
          </div>

          <div>
            <input type="text" value={room_id} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter room id..." />
            <button disabled={is_room_id_btn_disabled} onClick={joinRoom} className={`border-2 ${is_room_id_btn_disabled ? "cursor-not-allowed" : "cursor-pointer"} ${is_room_id_btn_disabled ? "" : "hover:bg-blue-400"}`} style={{ padding: "5px 15px" }}>
              Join New Group
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-400 w-screen flex flex-col">
        <div className="bg-purple-300" style={{ height: "80px" }}>
          {Object.hasOwn(props.current_room, "room_id") ? <div className="text-3xl font-extrabold text-green-700 pl-4">{props.current_room.room_name}</div> : <div className="text-3xl font-extrabold text-green-700 pl-4">Header</div>}
          <div className="float-right pb-4 pr-4">online users: {props.online_users}</div>{" "}
        </div>
        <div className="bg-red-300 overflow auto flex flex-col gap-4 relative p-2" style={{ height: "480px" }}>
          <div id="chat-box" className="h-full bg-yellow-300 overflow-auto p-4">
            {props.message_list.map((message, i) => {
              return (
                <div key={i} className="mb-4  rounded-xl bg-zinc-900 px-2 py-6 sm:px-4">
                  <div className="flex">
                    <img className="-ml-1 mr-4 h-8 w-8 rounded-full" src={message.user_avatar || props.avatar} />
                    <div className="flex max-w-3xl items-center text-md text-gray-300">{message.username || "Nothing"}</div>
                  </div>
                  <div className="flex max-w-3xl items-center text-white  text-sm text-gray-400  ml-12">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex rounded-lg shadow-sm pb-4" style={{ height: "60px" }}>
            <input
              type="text"
              id="hs-leading-button-add-on"
              name="hs-leading-button-add-on"
              value={new_message}
              onChange={(e) => setNewMessage(e.target.value)}
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
            <button
              type="button"
              disabled={is_btn_disabled}
              onClick={SubmitMessage}
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md border border-transparent bg-teal-900 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  room: state.login_store.room,
  avatar: state.login_store.avatar,
  username: state.login_store.username,
  message_list: state.chat_store.message_list,
  room_list: state.chat_store.room_list,
  current_room: state.chat_store.current_room,
  online_users: state.chat_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Disconnect_Socket: () => dispatch(DisconnectSocket()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
  Get_Room_Data: () => dispatch(GetRoomData()),
  Get_Message_Data: (room_id) => dispatch(GetMessageData(room_id)),
  Set_Current_Room: (room) => dispatch(SetCurrentRoom(room)),
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Create_New_Room: (room_name) => dispatch(CreateNewRoom(room_name)),
  Join_New_Room: (room_id) => dispatch(JoinNewRoom(room_id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
