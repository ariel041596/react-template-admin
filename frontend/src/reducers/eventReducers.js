import {
  EVENT_ADD_REQUEST,
  EVENT_ADD_SUCCESS,
  EVENT_ADD_FAIL,
  EVENT_ADD_RESET,
} from "../constants/eventConstants";

export const eventAddReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_ADD_REQUEST:
      return { loading: true };
    case EVENT_ADD_SUCCESS:
      return { loading: false, success: true };
    case EVENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_ADD_RESET:
      return {};
    default:
      return state;
  }
};
