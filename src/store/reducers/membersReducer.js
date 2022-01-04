const memberReducer = (state = [], action) => {
  switch (action.type) {
    // add error scenarios
    case "addMember":
      return [...state.members, action.payload];
    case "fetchMembersSuccess":
      return [...action.payload];
    default:
      return state;
  }
};

export default memberReducer;
