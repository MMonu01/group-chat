import { ApiUrl } from "~/env";

import { SET_USER_INFO } from "~/reducers/login-reducer";

import { Alertify } from "~/scripts/Alertify";
import { ErrorExtractor } from "~/scripts/Error-extractor";

export const SetUserInfo = (name, room) => (dispatch) => {};

/**
 * @description function to get user details from the server
 * @returns {Promise}
 */
export const GetUserDetails = () => (dispatch) => {
  return fetch(`${ApiUrl}/user/userDetails`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      if (data.logged_in_success) {
        dispatch(SET_USER_INFO(data));
      } else {
        // dispatch(LOGOUT());
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.error(`Could not get user details ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
          console.log("error messge", error_message);
        });
      }
    });
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
        Alertify.error(`Could not logouts ${err}`);
        console.log(err);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
          console.log(err);
        });
      }
      return Promise.reject();
    });
};
