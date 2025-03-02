import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignIn from "./Components/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
