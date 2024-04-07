import { StartSocketConnection } from "~/actions/socket-actions";

export const StartupGetInitialData = () => (dispatch) => {
  dispatch(StartSocketConnection());
};
