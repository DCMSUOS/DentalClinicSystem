const initialState = { patients: [] };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PATIENTS":
      return {
        ...state,
        patients: action.data,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
