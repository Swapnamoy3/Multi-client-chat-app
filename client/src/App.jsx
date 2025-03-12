import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import ChatApp from './pages/ChatApp'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AuthContext from './context/AuthContext';
import { getRequest } from './utils/apiRequests';

function ProtectedRoute({ children }){
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user,setUser] = React.useState(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(()=>{
    async function checkAuth(){
      const response = await getRequest("http://localhost:3000/isLoggedIn", {credentials: 'include'});
      const status = response.status == 200;
      const user = response.user;
      setIsAuthenticated(temp => (status));
      setUser(temp => user);
      setHasLoaded(temp => true);
      console.log("isAuthenticated: ",isAuthenticated)
    } 

    checkAuth();
  },[])

  return <>
        <AuthContext.Provider value={user}>
          {hasLoaded && (isAuthenticated ? children : <Navigate to="/signup"/>)}
        </AuthContext.Provider>
  </>

}

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<ProtectedRoute> {<ChatApp/>} </ProtectedRoute>} />
          <Route path = "signup" element = {<SignUp/>} />
          <Route path = "/login" element = {<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
