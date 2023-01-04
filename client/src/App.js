import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;