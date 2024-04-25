import { useEffect } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";

import ChatMenu from "~/components/mobile/chat-menu";

import { GetRoomData, SetCurrentRoom } from "~/actions/chat-actions";
import { StartSocketConnection, SocketJoinRoom } from "~/actions/socket-actions";

const ChatScreen = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    props.Start_Socket_Connection();
    props.Get_Room_Data();
  }, []);

  return (
    <div className="h-screen bg-zinc-800 flex ">
      <div className="bg-zinc-900 text-white overflow-auto" style={{ width: "100%" }}>
        <ChatMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  room_list: state.chat_store.room_list,
  current_room: state.chat_store.current_room,
});
const mapDispatchToProps = (dispatch) => ({
  Get_Room_Data: () => dispatch(GetRoomData()),
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
  Set_Current_Room: (current_room) => dispatch(SetCurrentRoom(current_room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
