import Register from "./pages/Register";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";


function App() {
  return (
    <Routes>
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login  />} />

    </Routes>
   
  
  );
}

export default App;
