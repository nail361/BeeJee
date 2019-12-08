import * as types from './ActionTypes';

export function addTasks(tasks, tasksLength) {
  return {
    type: types.ADD_TASKS,
    tasks,
    tasksLength,
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
