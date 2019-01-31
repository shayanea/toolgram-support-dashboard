import * as type from "../actions/type";

const initalState = {
  isLoading: false,
  items: [],
  channels: [],
  accounts: [],
  size: 10,
  page: 1,
  status: ""
};

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_POSTS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        size: action.payload.size,
        page: action.payload.page,
        items: action.payload.items,
        channels: action.payload.channels,
        accounts: action.payload.accounts,
        status: action.payload.status
      };
    default:
      return state;
  }
}
