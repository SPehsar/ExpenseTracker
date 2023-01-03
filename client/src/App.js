import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";

export function verifyUserExist(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <verifyUserExist>
              <HomePage />
            </verifyUserExist>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;