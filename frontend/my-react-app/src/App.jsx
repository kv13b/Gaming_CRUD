import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignIn from "./Components/SignUp";
import Home from "./Components/Home";
import ClientMaster from "./Components/ClientMaster/ClientMaster";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<ClientMaster />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
