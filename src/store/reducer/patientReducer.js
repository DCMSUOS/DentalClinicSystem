const initialState = { patients: [], appointments: [] };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PATIENTS":
      return {
        ...state,
        patients: action.data,
      };
    case "SET_APPOINTMENTS":
      return {
        ...state,
        appointments: action.data,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
