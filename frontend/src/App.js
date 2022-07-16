import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerifyScreen from "./screens/VerifyScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";
import AccountScreen from "./screens/AccountScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verify" element={<VerifyScreen />} />
        <Route path="/verify/:emailtoken" element={<VerifyEmailScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
