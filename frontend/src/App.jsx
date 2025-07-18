import { useState } from 'react'
import HomePage from './components/HomePage.jsx'
import Hotels from './components/Hotels.jsx'
import Experience from './components/Experience.jsx'
import Discounts from './components/Discounts.jsx'
import Login from  './components/Login.jsx'
import About from './components/About.jsx'
import { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'

function App() {
   useEffect(() =>{
  async function userData(){
    try{
      const response = fetch('http://localhost:3003/Login')
                      if (!response.ok){
                        throw new Error(`HTTP error:`, $(response.status))
                      }
      const data = await response.json()
       console.log(data)
       }catch(e){
        console.log(e)
       } 
  }

  //userData()

   },[])

  return (
    <>
    <Routes>
      <Route path={"/Home"} element={<HomePage/>}/>
      <Route path={"/Hotels"} element={<Hotels/>}/>
      <Route path={"/Experience"} element={<Experience/>}/>
      <Route path={"/About"} element={<About/>}/>
      <Route path={"/Discounts"} element={<Discounts/>}/>
      <Route path={"/Login"} element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
