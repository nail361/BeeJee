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

  case types.SET_LOADING:
    return {
      ...state,
      isLoading: action.isLoading,
    }

  default:
    return state;
  }
}
