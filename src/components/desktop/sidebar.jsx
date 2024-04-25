import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DarkMode, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";

import { GetUserLogout } from "~/actions/login-actions";
import { CreateNewRoom, JoinNewRoom } from "~/actions/chat-actions";

const Sidebar = ({ isOpen, onClose, ...props }) => {
  const [room_id, setRoomId] = useState("");
  const [new_room, setNewRoom] = useState("");

  const navigate = useNavigate();

  const joinRoom = () => {
    props.Join_New_Room(room_id);
    setRoomId("");
    onClose();
  };

  const createRoom = () => {
    props.Create_New_Room(new_room);
    setNewRoom("");
    onClose();
  };

  const onLogout = () => {
    props
      .Get_User_Logout()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  const is_create_room_disabled = new_room.trim().length < 3;
  const is_room_id_btn_disabled = room_id.trim().length < 24;

  return (
    <>
      <DarkMode>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} style={{ background: "black" }}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="red" />
            <DrawerHeader color="white">Convoium</DrawerHeader>
            <DrawerBody>
              <div className="mb-2 border-gray-400 flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={new_room}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-white text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    placeholder="Create new group / group name..."
                    rows="1"
                    required
                  />
                  <button type="button" disabled={is_create_room_disabled} onClick={createRoom} className={`absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none`}>
                    <AddIcon />
                  </button>
                </div>

                <div className="relative">
                  <input type="text" value={room_id} onChange={(e) => setRoomId(e.target.value)} className={`w-full rounded-lg border border-slate-300 p-3 pr-10 text-white text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Join new group / group id..." rows="1" />
                  <button type="button" disabled={is_room_id_btn_disabled} onClick={joinRoom} className={`absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none `}>
                    <AddIcon />
                  </button>
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <button type="button" onClick={onLogout} class="mb-2 block border border-red-600 w-full rounded bg-red-600 px-6 p-2 py-3 text-xs font-medium uppercase leading-normal text-white  hover:bg-primary-accent-300 hover:bg-red-700 active:bg-red-800">
                Logout
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DarkMode>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Logout: () => dispatch(GetUserLogout()),
  Join_New_Room: (room_id) => dispatch(JoinNewRoom(room_id)),
  Create_New_Room: (room_name) => dispatch(CreateNewRoom(room_name)),
});
export default connect(null, mapDispatchToProps)(Sidebar);
