import { LOGIN, SET_DATA } from "../actions/actions";

const initialState = {
  userName: "",
  listOfUsers: [],
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userName: action.payload.name,
      };
    case SET_DATA:
      return {
        userName: action.payload.name,
        listOfUsers: action.payload.listOfUsers,
      };
    default:
      return state;
  }
};

export default application;
