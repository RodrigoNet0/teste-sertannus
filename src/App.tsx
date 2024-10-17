import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./routes/routes.inventory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="*" element={<Login />} />
           <Route path="/Inventory" element={<Inventory  />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
