import { useState } from "react";
import HomePage from "./components/HomePage.jsx";
import Hotels from "./components/Hotels.jsx";
import Experience from "./components/Experience.jsx";
import Discounts from "./components/Discounts.jsx";
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from './components/Details.jsx'

import "./App.css";
import { set } from "mongoose";




function App() {

  const [users, setUsers] = useState([])
  //const [loading, setLoading] = useState(false)
 // const [error, setError] = useState(null)
  
  useEffect(() => {
    userData();
  }, []);

  const userData = async() =>{
    setLoading(true);
    setError(null);
      try {
        const response = await fetch("http://localhost:3003/users");
        if (!response.ok) {
          throw new Error(`HTTP error:`, response.status);
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
    }
  }
    console.log(users);
 
  
  
  return (
     
    <>
   
      <Routes>
        <Route path={"/"} element={<HomePage />}/>
        <Route path={"/Details/:topic"}  element={<Details/>}/>
        <Route path={"/Hotels"} element={<Hotels />} />
        <Route path={"/Experience"} element={<Experience/>} />
        <Route path={"/About"} element={<About />} />
        <Route path={"/Discounts"} element={<Discounts />} />
        <Route path={"/Register"} element={<Register setUsers={setUsers} users ={users} />} />
        <Route path={"/Login"} element={<Login />} />
      </Routes>
      
    </>
  );
}

export default App;
