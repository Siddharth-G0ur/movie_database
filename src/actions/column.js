import { ADD_COLUMN } from "./types";

const addColumn = (column) => (dispatch) => {
  dispatch({
    type: ADD_COLUMN,
    payload: column,
  });
};

export default addColumn;
