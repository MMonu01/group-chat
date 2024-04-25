import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DarkMode, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

const Sidebar = ({ isOpen, onClose }) => {
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
                    // value={search_chat}
                    // onChange={(e) => setSearchChat(e.target.value)}
                    // onKeyUp={handleKeyDown}
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    placeholder="Create new group / group name..."
                    rows="1"
                    required
                  />
                  <button type="button" className="absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none ">
                    <AddIcon />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    // value={search_chat}
                    // onChange={(e) => setSearchChat(e.target.value)}
                    // onKeyUp={handleKeyDown}
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    placeholder="Join new group / group id..."
                    rows="1"
                    required
                  />
                  <button type="button" className="absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none ">
                    <AddIcon />
                  </button>
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <button type="button" class="mb-2 block border border-red-600 w-full rounded bg-red-600 px-6 p-2 py-3 text-xs font-medium uppercase leading-normal text-white  hover:bg-primary-accent-300 hover:bg-red-700 active:bg-red-800">
                Logout
              </button>
              {/* <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DarkMode>
    </>
  );
};

export default Sidebar;
