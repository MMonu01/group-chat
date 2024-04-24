import { useEffect } from "react";
import { connect } from "react-redux";
import { Badge, Stack, useDisclosure } from "@chakra-ui/react";

import ChatMenu from "~/components/desktop/chat-menu";
import MessageContainer from "~/components/desktop/message-container";

import { GetRoomData, SetCurrentRoom } from "~/actions/chat-actions";
import { StartSocketConnection, SocketJoinRoom } from "~/actions/socket-actions";

const ChatScreen = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    props.Start_Socket_Connection();
    props.Get_Room_Data().then((room_list) => {
      if (room_list.length > 0) {
        if (Object.keys(props.current_room).length > 0) {
          props.Socket_Join_Room();
        } else {
          props.Set_Current_Room(room_list[0]);
          props.Socket_Join_Room();
        }
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex ">
      <div className="bg-zinc-900 text-white overflow-auto  bg-[hsl(218,23%,23%)]" style={{ width: "400px" }}>
        <ChatMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
      <div className={`bg-gray-200 w-screen flex flex-col items-center justify-center`}>
        {Object.keys(props.current_room).length > 0 ? (
          <MessageContainer />
        ) : (
          <div className="p-4 flex flex-col gap-2">
            <div className="text-xl font-semibold">You are not currently in any group: </div>
            <Stack direction="row">
              <Badge onClick={onOpen} colorScheme="green" className="cursor-pointer">
                Create group
              </Badge>
              <Badge onClick={onOpen} colorScheme="purple" className="cursor-pointer">
                Join group
              </Badge>
            </Stack>
          </div>
        )}
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
