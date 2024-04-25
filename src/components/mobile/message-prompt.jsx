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
    <div className="fixed bottom-0 w-full">
      <div className="relative">
        <textarea name="message input" id="MessageArea" value={new_message} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleEnter} className="p-4 pb-12 block w-full outline-none text-sm disabled:pointer-events-none" style={{ height: "6px" }} placeholder="Write your message..." />
        <button type="button" disabled={is_btn_disabled} onClick={submitMessage} className="absolute top-2 right-2 flex flex-shrink-0 justify-center items-center size-12 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Chat_Send_New_Messages: (message) => dispatch(ChatSendNewMessages(message)),
});
export default connect(null, mapDispatchToProps)(MessagePrompt);
