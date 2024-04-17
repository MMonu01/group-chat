import { StartSocketConnection } from "~/actions/socket-actions";
import { GetUserDetails } from "~/actions/login-actions";

export const StartupGetInitialData = () => (dispatch) => {
  // dispatch(StartSocketConnection());
  dispatch(GetUserDetails());
};
