import React from "react";
import { auth } from "../firebase";
import { bindActionCreators } from "redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/authActions";

const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { userSignup, userLogin, userSignout } = bindActionCreators(
    authActions,
    dispatch
  );
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const logoutUser = auth.onAuthStateChanged((user) => {
      user
        ? localStorage.setItem("authUser", JSON.stringify(user))
        : localStorage.removeItem("authUser");
      setCurrentUser(user);
      setLoading(false);
      return logoutUser;
    }, []);
  });

  const value = { currentUser, userSignup, userLogin, userSignout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
