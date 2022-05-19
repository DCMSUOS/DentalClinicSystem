import moment from "moment";

const initialState = {
  patients: [],
  appointments: [],
  duration: {
    startDate: moment().subtract(4, "month").valueOf(),
    endDate: moment().valueOf(),
  },
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PATIENTS":
      return {
        ...state,
        patients: action.data,
      };
    case "SET_APPOINTMENTS":
      //let allApp = action.data.filter((a) => !a.isDeleted);
      return {
        ...state,
        appointments: action.data,
      };
    case "UPDATE_DURATION": {
      return {
        ...state,
        duration: action.data,
      };
    }

    default:
      return state;
  }
};

export default authenticationReducer;
