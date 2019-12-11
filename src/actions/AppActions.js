import * as types from './ActionTypes';
import { setCookie } from '../utils/help';

export function addTasks(tasks, totalTaskCount) {
  return {
    type: types.ADD_TASKS,
    tasks,
    totalTaskCount,
  };
}

export function updateTask(id, text, status) {
  return {
    type: types.UPDATE_TASK,
    id,
    text,
    status,
  };
}

export function changeOrder(orderField) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(
        {
          type: types.CHANGE_ORDER_FIELD,
          orderField,
        },
      );
      resolve();
    });
  };
}

export function changeSortDirection() {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(
        {
          type: types.CHANGE_SORT_DIRECTION,
        },
      );
      resolve();
    });
  };
}

export function changeStatus(taskId, status) {
  return {
    type: types.CHANGE_STATUS,
    taskId,
    status,
  };
}

export function changePage(page) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(
        {
          type: types.CHANGE_PAGE,
          page,
        },
      );
      resolve();
    });
  };
}

export function setLoading(isLoading) {
  return {
    type: types.SET_LOADING,
    isLoading,
  };
}

export function login() {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(
        {
          type: types.LOGIN,
        },
      );
      setCookie('isLogin', 'true');
      resolve();
    });
  };
}

export function logout() {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(
        {
          type: types.LOGOUT,
        },
      );
      setCookie('isLogin', 'false');
      resolve();
    });
  };
}
