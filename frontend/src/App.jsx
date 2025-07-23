import { useState } from "react";
import HomePage from "./components/HomePage.jsx";
import Hotels from "./components/Hotels.jsx";
import Experience from "./components/Experience.jsx";
import Discounts from "./components/Discounts.jsx";
import Register from "./components/Register.jsx"
//import Login from "./components/Register.jsx";
import About from "./components/About.jsx";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from './components/Details.jsx'

import "./App.css";



function App() {

  const [users, setUsers] = useState('')
  useEffect(() => {
    async function userData() {
      try {
        const response = await fetch("http://localhost:3003/users");
        if (!response.ok) {
          throw new Error(`HTTP error:`, response.status);
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    }
    userData();
  }, []);
  // The homepage route is supposed to have a path pointing to "/"..This was a problem that made my 
  // website go blank for few hours and was rectified.
  //fixed passing prop to the login route, since im to use it at the login page/
  return (
     
    <>
   
      <Routes>
        <Route path={"/Details/:topic"}  element={<Details/>}/>
        <Route path={"/"} element={<HomePage />}/>
        <Route path={"/Hotels"} element={<Hotels />} />
        <Route path={"/Experience"} element={<Experience/>} />
        <Route path={"/About"} element={<About />} />
        <Route path={"/Discounts"} element={<Discounts />} />
        <Route path={"/Register"} element={<Register setUsers={setUsers} users ={users} />} />
      </Routes>
      
    </>
  );
}

export default App;
