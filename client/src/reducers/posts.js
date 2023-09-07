import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE_POST,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
    case LIKE_POST:
      return state.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
    case DELETE:
      return state.filter((e) => e._id !== action.payload);
    default:
      return state;
  }
};
