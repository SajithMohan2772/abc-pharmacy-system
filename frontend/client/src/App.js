import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Invoice from './pages/Invoice';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/login" component={<LoginPage/>} />
        <Route path="/signup" component={<SignupPage/>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/Invoice" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
