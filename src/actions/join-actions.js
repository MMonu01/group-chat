import { SET_USER_INFO } from "~/reducers/join-reducer";

export const SetUserInfo = (name, room) => (dispatch) => {
  dispatch(SET_USER_INFO({ name, room }));
};
