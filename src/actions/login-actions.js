import { ApiUrl } from "~/env";

import { Alertify } from "~/scripts/Alertify";
import { ErrorExtractor } from "~/scripts/Error-extractor";

/**
 * @description function to get user details from the server
 * @returns {Promise}
 */
export const GetUserDetails = () => (dispatch) => {
  console.log("nothing is happening");
  return fetch(`${ApiUrl}/user/userDetails`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      console.log("data", data.logged_in_success);
      if (data.logged_in_success) {
        // dispatch(GET_USER_DETAILS(data));
        console.log(data, "nothing");
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
