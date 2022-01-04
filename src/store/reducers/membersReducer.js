const memberReducer = (state = [], action) => {
  switch (action.type) {
    // add error scenarios
    case "addMember":
      return [...state.members, action.payload];
    case "FETCH_MEMBERS_SUCCESS":
      return [...action.payload];
    default:
      return state;
  }
};

export default memberReducer;
