import Register from "./pages/Register";
import { Route,Routes } from "react-router-dom";

import { UserContextProvider } from "./pages/UserContext";
import AccountPage from "./pages/AccountPage";
import Logins from "./pages/Logins";


function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Logins />} />
 
    <Route path="/account" element={<AccountPage />} />

    </Routes>
    
    
    </UserContextProvider>
  );
}

export default App;
