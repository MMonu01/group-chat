import { ApiUrl } from "~/env";

import { SET_USER_INFO } from "~/reducers/join-reducer";

export const SetUserInfo = (name, room) => (dispatch) => {
  dispatch(SET_USER_INFO({ name, room }));
};

/**
 * @description function to get user logout
 * @returns  {Promise}
 */
export const GetUserLogout = () => (dispatch) => {
  return fetch(`${ApiUrl}/user/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .catch((err) => {
      if (err instanceof Error) {
        // Alertify.error(`Could not get user details ${err}`);
        console.log(err);
      } else {
        err.text().then((err) => {
          // const error_message = ErrorExtractor(err);
          // Alertify.error(error_message);
          console.log(err);
        });
      }
      return Promise.reject();
    });
};
