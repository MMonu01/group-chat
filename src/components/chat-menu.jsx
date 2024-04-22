import { useState } from "react";
import { connect } from "react-redux";

import { SocketJoinRoom } from "~/actions/socket-actions";
import { SetCurrentRoom, CreateNewRoom, JoinNewRoom } from "~/actions/chat-actions";

const ChatMenu = (props) => {
  const [new_room, setNewRoom] = useState("");
  const [room_id, setRoomId] = useState("");

  const joinRoom = () => {
    props.Join_New_Room(room_id);
    setRoomId("");
  };

  const is_create_room_disabled = new_room.trim().length < 3;
  const is_room_id_btn_disabled = room_id.trim().length < 24;

  const getCurrentRoomData = (room) => {
    props.Set_Current_Room(room);
    props.Socket_Join_Room();
  };

  const createRoom = () => {
    props.Create_New_Room(new_room);
    setNewRoom("");
  };

  return (
    <div className="bg-zinc-900 text-white overflow-auto" style={{ width: "400px" }}>
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-2 text-sm items-center">
          <img className="h-12 w-12 rounded-full border-2 border-green-700" src={props.avatar} />
          <div>{props.username}</div>
        </div>

        <div className="cursor-pointer p-y-2">---</div>
      </div>

      <div className="p-2 border-t border-b mb-2 border-gray-400">
        <div className="relative">
          <input
            id="search-chats"
            type="text"
            // value={search_chat}
            // onChange={(e) => setSearchChat(e.target.value)}
            // onKeyUp={handleKeyDown}
            className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Search chats"
            rows="1"
            required
          />
          <button type="button" className="absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 9h8"></path>
              <path d="M8 13h5"></path>
              <path d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M20.2 20.2l1.8 1.8"></path>
            </svg>
            <span className="sr-only">Search chats</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 pt-2">
        {props.room_list.map((room, i) => {
          return (
            <div onClick={() => getCurrentRoomData(room)} className="bg-zinc-800 w-full p-2 hover:bg-zinc-700 cursor-pointer " key={i}>
              <div className="text-xl text-gray-200">{room.room_name}</div>
              <div className="text-sm text-gray-400">preview of the room</div>
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
  );
};

const mapStateToProps = (state) => ({
  avatar: state.login_store.avatar,
  email: state.login_store.email,
  username: state.login_store.username,
  room_list: state.chat_store.room_list,
  current_room: state.chat_store.current_room,
});
const mapDispatchToProps = (dispatch) => ({
  Set_Current_Room: (room) => dispatch(SetCurrentRoom(room)),
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Create_New_Room: (room_name) => dispatch(CreateNewRoom(room_name)),
  Join_New_Room: (room_id) => dispatch(JoinNewRoom(room_id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatMenu);
