import * as types from '../actions/ActionTypes';

export const initialState = {
  tasks: [],
  totalTaskCount: 0,
  orderFiled: 'id',
  sortDirection: 'asc',
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
      orderFiled: state.orderFiled,
      sortDirection: state.sortDirection,
      pageSize: state.pageSize,
      curPage: state.curPage,
    };
  case types.CHANGE_ORDER_FIELD:
    return {
      tasks: state.tasks,
      totalTaskCount: action.tasksLength,
      orderFiled: action.orderFiled,
      sortDirection: state.sortDirection,
      pageSize: state.pageSize,
      curPage: state.curPage,
    };
  case types.CHANGE_SORT_DIRECTION:
    return {
      tasks: state.tasks,
      totalTaskCount: action.tasksLength,
      orderFiled: state.orderFiled,
      sortDirection: action.sortDirection,
      pageSize: state.pageSize,
      curPage: state.curPage,
    }
  case types.CHANGE_PAGE:
    return {
      ...state,
      curPage: action.page,
    };

  default:
    return state;
  }
}
