import * as types from '../actions/ActionTypes';

export const initialState = {
  tasks: [],
  totalTaskCount: 0,
  pageSize: 3,
  curPage: 0,
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
  case types.ADD_TASKS:
    return {
      tasks: [
        ...state.tasks,
        ...action.tasks,
      ],
      totalTaskCount: action.tasksLength,
      pageSize: state.pageSize,
      curPage: state.curPage,
    };
  case types.REMOVE_TASK:
    return {
      ...state,
      tasks: [
        ...state.tasks.filter((task) => task.id !== action.taskId),
      ],
      totalTaskCount: state.totalTaskCount - 1,
    };
  case types.CHANGE_STATUS:
    return {
      //
    };

  case types.CHANGE_PAGE:
    return {
      ...state,
      curPage: action.page,
    };

  default:
    return state;
  }
}
