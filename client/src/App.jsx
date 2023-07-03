import Register from "./pages/Register";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import { UserContextProvider } from "./pages/UserContext";


function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    </Routes>
    
    
    </UserContextProvider>
  
   
  
  );
}

export default App;
