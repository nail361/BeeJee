import * as types from '../actions/ActionTypes';

export const initialState = {
  tasks: [],
  totalTaskCount: 0,
  orderField: 'id',
  sortDirection: 'asc',
  pageSize: 3,
  curPage: 1,
  isLogin: false,
  isLoading: true,
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
  case types.ADD_TASKS:
    return {
      ...state,
      ...{
        tasks: [...action.tasks],
        totalTaskCount: action.totalTaskCount,
      },
    };
  case types.UPDATE_TASK:
    return {
      ...state,
      ...{
        tasks: [...state.tasks.map((task) => {
          if (task.id === action.id) {
            const newTask = {
              ...task,
              ...{
                text: action.text,
                status: action.status,
              },
            };
            return newTask;
          }
          return task;
        })],
      },
    };
  case types.CHANGE_ORDER_FIELD:
    return {
      ...state,
      orderField: action.orderField,
    };
  case types.CHANGE_SORT_DIRECTION:
    return {
      ...state,
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
    };
  case types.CHANGE_PAGE:
    return {
      ...state,
      curPage: action.page,
    };

  case types.LOGIN:
    return {
      ...state,
      isLogin: true,
    };

  case types.LOGOUT:
    return {
      ...state,
      isLogin: false,
    };

  case types.SET_LOADING:
    return {
      ...state,
      isLoading: action.isLoading,
    };

  default:
    return state;
  }
}
