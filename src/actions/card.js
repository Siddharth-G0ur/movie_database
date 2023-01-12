import { ADD_CARD, REMOVE_CARD, EDIT_CARD } from "./types";
import * as _ from "radash";

const addCard = (formData) => (dispatch) => {
  const id = _.uid(6);
  formData.id = id;
  dispatch({
    type: ADD_CARD,
    payload: formData,
  });
};

const removeCard = (id) => (dispatch) => {
  dispatch({ type: REMOVE_CARD, payload: id });
};

const editCard = (formData) => (dispatch) => {
  dispatch({ type: EDIT_CARD, payload: formData });
};

export { addCard, removeCard, editCard };
