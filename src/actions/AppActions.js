import * as types from './ActionTypes';

export function addTasks(tasks, totalTaskCount) {
  return {
    type: types.ADD_TASKS,
    tasks,
    totalTaskCount,
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
  }
}
