import * as types from './ActionTypes';

export function addTask() {
  return {
    type: types.ADD_TASK,
  };
}

export function removeTask() {
  return {
    type: types.REMOVE_TASK,
  };
}

export function changeStatus() {
  return {
    type: types.CHANGE_STATUS,
  };
}
