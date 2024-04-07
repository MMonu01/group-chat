import { useEffect } from "react";
import { connect } from "react-redux";

import { DisconnectSocket } from "~/actions/socket-actions";
import { StartSocketConnection } from "~/actions/socket-actions";

const ChatScreen = (props) => {
  useEffect(() => {
    props.name && props.Start_Socket_Connection();
  }, []);

  const disconnectSocket = () => {
    props.Disconnect_Socket();
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Live users {props.socket_count}</h1>
        <h1>Room {props.room}</h1>
        <button onClick={disconnectSocket}>Disconnect</button>{" "}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.join_store.name,
  room: state.join_store.room,
  socket_count: state.socket_store.socket_count,
});
const mapDispatchToProps = (dispatch) => ({
  Disconnect_Socket: () => dispatch(DisconnectSocket()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
