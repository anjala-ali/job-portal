import { LOGOUT } from '../action/authAction';

const initialState = {
  isAuthenticated: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;