import * as type from "../actions/type";

const initalState = {
  isLoading: false,
  items: [],
  accounts: [],
  size: 10,
  page: 1,
  status: 0
};

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_FEEDBACKS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        accounts: action.payload.accounts,
        status: action.payload.status
      };
    default:
      return state;
  }
}
