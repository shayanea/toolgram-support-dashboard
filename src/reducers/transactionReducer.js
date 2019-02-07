import * as type from "../actions/type";

const initalState = {
  isLoading: false,
  items: [],
  accounts: [],
  profiles: [],
  size: 10,
  page: 1
};

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_TRANSACTIONS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        accounts: action.payload.accounts,
        profiles: action.payload.profiles
      };
    case type.FETCH_BALANCES:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        accounts: action.payload.accounts,
        profiles: action.payload.profiles
      };
    case type.CLEAR_TRANSACTIONS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        accounts: action.payload.accounts,
        profiles: action.payload.profiles
      };
    default:
      return state;
  }
}
