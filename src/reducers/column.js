import { ADD_COLUMN } from "../actions/types";
const initialState = ["Add", "Educational", "Entertainment", "History"];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COLUMN:
      return [...state, payload];
    default:
      return state;
  }
}
