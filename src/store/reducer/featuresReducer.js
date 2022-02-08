const initialState = { services: []  , admins: [] };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICES":
      return {
        ...state,
        services: action.data,
      };
      case "SET_ADMINS":
      return {
        ...state,
        admins: action.data,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
