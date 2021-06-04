import axios from "axios";
import {
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  MY_TASK_REQUEST,
  MY_TASK_SUCCESS,
  MY_TASK_FAIL,
} from "../constants/taskConstants";

export const addTask = (task, start, end) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_ADD_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/tasks",
      { task, start, end },
      config
    );
    dispatch({
      type: TASK_ADD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ADD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getMyTasks = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({
      type: MY_TASK_REQUEST,
    });
    const { data } = await axios.get(`/api/tasks/mytasks`, config);
    dispatch({
      type: MY_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteTask = (taskID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tasks/${taskID}`, config);

    dispatch({
      type: TASK_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
