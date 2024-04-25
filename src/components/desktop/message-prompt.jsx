import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { ChatSendNewMessages } from "~/actions/socket-actions";

const MessagePrompt = (props) => {
  const [new_message, setNewMessage] = useState("");

  useEffect(() => {
    document.getElementById("MessageArea").focus();
  }, []);

  const is_btn_disabled = new_message.trim().length < 1;

  const submitMessage = () => {
    props.Chat_Send_New_Messages(new_message);
    setNewMessage("");
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !is_btn_disabled) {
      submitMessage();
      setNewMessage("");
    }
    document.getElementById("MessageArea").focus();
  };

  return (
    <div className="relative">
      <textarea name="message input" id="MessageArea" value={new_message} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleEnter} className="p-4 pb-12 block w-full outline-none text-sm disabled:pointer-events-none" style={{ height: "6px" }} placeholder="Write your message..." />

      {/* <!-- Toolbar --> */}
      <div className="bottom-px inset-x-px p-2 rounded-b-md bg-white">
        <div className="flex justify-between items-center">
          {/* <!-- Button Group --> */}
          <div className="flex items-center">
            {/* <!-- Mic Button --> */}
            {/* <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <line x1="9" x2="15" y1="15" y2="9" />
              </svg>
            </button> 
            {/* <!-- End Mic Button --> */}

            {/* <!-- Attach Button --> */}
            {/* <button type="button" class="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button> */}
            {/* <!-- End Attach Button --> */}
          </div>
          {/* <!-- End Button Group --> */}

          {/* <!-- Button Group --> */}
          <div className="flex items-center gap-x-1">
            {/* <!-- Mic Button --> */}
            {/* <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button> *
            {/* <!-- End Mic Button --> */}

            {/* <!-- Send Button --> */}
            <button type="button" disabled={is_btn_disabled} onClick={submitMessage} className="inline-flex flex-shrink-0 justify-center items-center size-12 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
            {/* <!-- End Send Button --> */}
          </div>
          {/* <!-- End Button Group --> */}
        </div>
      </div>
      {/* <!-- End Toolbar --> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
});
export default connect(null, mapDispatchToProps)(MessagePrompt);
