const initialState = { user: {}, isAuthenticate: false, loading: true };

const authenticationReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.data,
        isAuthenticate: true,
        loading: false,
      };
    case "LOGOUT": {
      return { ...state, user: {}, isAuthenticate: false, loading: false };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
