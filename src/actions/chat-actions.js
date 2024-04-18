import { ApiUrl } from "~/env";

/**
 * @description function to get user logout
 * @returns  {Promise}
 */
export const GetRoomData = () => (dispatch) => {
  return fetch(`${ApiUrl}/room/getrooms`)
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((data) => {
      console.log("room data", data);
    })
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
