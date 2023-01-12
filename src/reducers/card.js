import { ADD_CARD, REMOVE_CARD, EDIT_CARD } from "../actions/types";
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARD:
      return [...state, payload]; //we are adding payload into the state
    case REMOVE_CARD:
      return state.filter((card) => card.id !== payload.id);
    case EDIT_CARD:
      const reqCard = state.filter((card) => card.id !== payload.id);
      return [...reqCard, payload];
    default:
      return state;
  }
}
