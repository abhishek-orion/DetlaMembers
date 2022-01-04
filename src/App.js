import "./App.css";
import Signup from "./components/preAuth/Signup";
import Login from "./components/preAuth/Login";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import RestrictedRoute from "./components/helpers/RestrictedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/store";
function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <AuthProvider>
          <div className="appContainer">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <RestrictedRoute>
                    <Dashboard />
                  </RestrictedRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
