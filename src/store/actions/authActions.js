import { auth } from "../../firebase";

export function userSignup(email, password) {
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "SIGNUP_FAILED",
          error: error.message,
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_ERROR",
          });
        }, 5000);
      });
  };
}

export function userLogin(email, password) {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILED",
          error: error.message,
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_ERROR",
          });
        }, 5000);
      });
  };
}

export function userSignout() {
  localStorage.removeItem("authUser");
  return auth.signOut();
}
