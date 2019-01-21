import * as type from "../actions/type";

const initalState = {
  isLoading: false,
  data: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_PROFILE:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: action.payload.data
      };
    default:
      return state;
  }
}
