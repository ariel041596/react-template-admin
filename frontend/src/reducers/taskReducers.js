import {
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_RESET,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_RESET,
  MY_TASK_REQUEST,
  MY_TASK_SUCCESS,
  MY_TASK_FAIL,
  MY_TASK_RESET,
} from "../constants/taskConstants";

export const taskAddReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_ADD_REQUEST:
      return { loading: true };
    case TASK_ADD_SUCCESS:
      return { loading: false, success: true };
    case TASK_ADD_FAIL:
      return { loading: false, error: action.payload };
    case TASK_ADD_RESET:
      return {};
    default:
      return state;
  }
};
export const myTaskListReducer = (state = { myTasks: [] }, action) => {
  switch (action.type) {
    case MY_TASK_REQUEST:
      return { ...state, loading: true };
    case MY_TASK_SUCCESS:
      return { loading: false, myTasks: action.payload, success: true };
    case MY_TASK_FAIL:
      return { loading: false, error: action.payload };
    case MY_TASK_RESET:
      return { myTasks: [] };
    default:
      return state;
  }
};
export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
