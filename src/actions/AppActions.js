import * as types from './ActionTypes';

export function addTasks(tasks, totalTaskCount) {
  return {
    type: types.ADD_TASKS,
    tasks,
    totalTaskCount,
  };
}

export function changeOrder(orderField) {
  return {
    type: types.CHANGE_ORDER_FIELD,
    orderField,
  };
}

export function changeSortDirection() {
  return {
    type: types.CHANGE_SORT_DIRECTION,
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
  return {
    type: types.CHANGE_PAGE,
    page,
  };
}
