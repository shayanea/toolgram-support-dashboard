import * as type from "../actions/type";

const initalState = {
  isLoading: false,
  items: [],
  accounts: [],
  size: 10,
  page: 1,
  search: ""
};

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_CHANNELS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        accounts: action.payload.accounts,
        search: action.payload.search
      };
    default:
      return state;
  }
}
