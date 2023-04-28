import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
