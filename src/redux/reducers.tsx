import {
  SET_USER_NAME,
  SET_USER_AGE,
  INCREASE_AGE,
  SET_CARD_FACING,
  FLIP_CARD
} from "./actions";

const initialState = {
  name: "",
  age: 0,
  side: true
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_AGE:
      return { ...state, age: action.payload };
    case INCREASE_AGE:
      return { ...state, age: state.age + 1 };
    case SET_CARD_FACING:
      return { ...state, side: action.payload };
    case FLIP_CARD:
      return { ...state, side: !state.side };
    default:
      return state;
  }
}

export default userReducer;
