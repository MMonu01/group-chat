import { ApiUrl } from "~/env";

import { CHAT_SET_ROOMS_DATA, SET_CURRENT_ROOM, CHAT_SET_MESSAGE_LIST, CHAT_SET_NEW_ROOM } from "~/reducers/chat-reducer";

import { Alertify } from "~/scripts/Alertify";
import { ErrorExtractor } from "~/scripts/Error-extractor";

/**
 * @description function to get user logout
 * @returns  {Promise}
 */
export const GetRoomData = (search) => (dispatch) => {
  return fetch(`${ApiUrl}/room/getrooms`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: search || "" }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_SET_ROOMS_DATA(data));

      return Promise.resolve(data);
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not create room ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
      return Promise.reject();
    });
};

export const GetMessageData = (room_id) => (dispatch) => {
  return fetch(`${ApiUrl}/message/getmessages`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room_id }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_SET_MESSAGE_LIST(data));
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not get message data ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};

export const CreateNewRoom = (room_name) => (dispatch) => {
  return fetch(`${ApiUrl}/room/createroom`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room_name }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_SET_NEW_ROOM(data));
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not create room ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};

export const JoinNewRoom = (room_id) => (dispatch) => {
  return fetch(`${ApiUrl}/room/joinroom`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room_id }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      if (data.ok) {
        dispatch(CHAT_SET_NEW_ROOM(data));
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not join room ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }

      return Promise.reject();
    });
};

export const SetCurrentRoom = (room) => (dispatch) => {
  dispatch(SET_CURRENT_ROOM(room));
};
