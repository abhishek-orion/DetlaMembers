const authReducer = (state = {}, action) => {
  switch (action.type) {
    // add error scenarios
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, error: null };
    case "LOGIN_FAILED":
      return { ...state, loggedIn: false, error: action.error };
    case "SIGNUP_SUCCESS":
      return { ...state, loggedIn: true, error: null };
    case "SIGNUP_FAILED":
      return { ...state, loggedIn: false, error: action.error };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
