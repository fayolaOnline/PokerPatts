export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_AGE = "SET_USER_AGE";
export const INCREASE_AGE = "INCREASE_AGE";
export const SET_CARD_FACING = "SET_CARD_FACING";
export const FLIP_CARD = "FLIP_CARD";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name
  });
};

export const setAge = (age) => (dispatch) => {
  dispatch({
    type: SET_USER_AGE,
    payload: age
  });
};

export const increaseAge = (age) => (dispatch) => {
  dispatch({
    type: INCREASE_AGE,
    payload: age
  });
};

export const setCardFacing = (side) => (dispatch) => {
  dispatch({
    type: SET_CARD_FACING,
    payload: side
  });
};

export const flipCard = (side) => (dispatch) => {
  dispatch({
    type: SET_CARD_FACING,
    payload: side
  });
};
