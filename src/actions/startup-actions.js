import { GetUserDetails } from "~/actions/login-actions";

export const StartupGetInitialData = () => (dispatch) => {
  dispatch(GetUserDetails());
};
