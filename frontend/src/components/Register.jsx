//import { set } from 'mongoose';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login.jsx';
//import { Link } from 'react-router-dom'
//import {useRef , useEffect, useState} from 'react'

const Register = ({setUsers, users}) => {

 
    const [state, setState] = React.useState("register");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
const navigate = useNavigate()



//function to post data to backend
async function postRegisterUser(data) {

  const url = "http://localhost:3003/users/register"
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      
    },
  });
    
  return response.ok ? await response.json() : null;
    
}}


async function handleSubmit(e) {
  try{
  e.preventDefault();
  const data = { name, email, password };
  const newUser = await postRegisterUser(data);
  if (newUser) {
    alert("User registered successfully");
    navigate("/");
     if (state === "register") setUsers([...users, newUser]);
  
  }}
  catch (error) {
    console.log(error);
    alert("Error registering user" + error.message);
};



return (
  <>
    <div className="Register-container">
      {state === "register" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-indigo">
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">User</span> Sign Up
          </p>
          <div className="w-full">
            <p>Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
          </div>
          <div className="w-full ">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
          </div>
          <p>
            Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
          </p>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            Create Account
          </button>
        </form>
      ) : (
        <>
          <Login />
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
          </p>
        </>
      )}
    </div>
  </>
)}
;

export default Register