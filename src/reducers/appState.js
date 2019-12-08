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
        ...action.tasks,
      ],
      totalTaskCount: action.tasksLength,
      pageSize: state.pageSize,
      curPage: state.curPage,
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
