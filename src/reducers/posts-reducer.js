import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload.data };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload.data };
    default:
      return state;
  }
};

export default PostsReducer;
