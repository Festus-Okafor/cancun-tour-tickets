import { useState } from 'react'
import HomePage from './components/HomePage.jsx'
import { useEffect } from 'react'

import './App.css'

function App() {
   useEffect(() =>{
  async function userData(){
    try{
      const response = fetch('http://localhost:3003')
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
    <HomePage/>
    </>
  )
}

export default App
