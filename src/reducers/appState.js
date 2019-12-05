import * as types from '../actions/ActionTypes';

export const initialState = {
  tasks: [],
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
  case types.ADD_TASK:
    return {
      tasks: [
        ...state.tasks,
        {
          id: 0,
          username: 'Test User',
          email: 'test_user_1@example.com',
          text: 'Hello, world!',
          status: 10,
        },
      ],
    };
  case types.REMOVE_TASK:
    return {
      //
    };
  case types.CHANGE_STATUS:
    return {
      //
    };

  default:
    return state;
  }
}
