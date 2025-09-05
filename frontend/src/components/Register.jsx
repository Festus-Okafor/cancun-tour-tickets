import { set } from 'mongoose';
import React from 'react'
import { useNavigate } from 'react-router-dom'
//import {useRef , useEffect, useState} from 'react'

const Register = ({setUsers, users}) => {

 
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
const navigate = useNavigate()



// Helper function for login/register POST requests
async function postAuthForm(state, data) {
  const url =
  //if state is register, post to user endpoint, else post to login endpoint
    state === "register"
      ? "http://localhost:3003/api/register"
      : "http://localhost:3003/api/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      
    },
  });
    
  return response.ok ? await response.json() : null;
    
}

// ...existing code...
async function handleSubmit(e) {
  e.preventDefault();
  const data = { name, email, password };
  const setUsers = await postAuthForm(state, data);
  if (setUsers) {
    navigate("/");
    alert(
      state === "register"
        ? "Successfully Registered, Please go ahead and Login"
        : "Login Successful"
    );
    if (state === "register") setUsers([...users, setUsers]);
  }
};



// ...existing code...
  return (
    <>
    <div className="Register-container">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-indigo">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
          


            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>


            )}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>

                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
                </div>



           
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
                

                 

            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            
            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
        </div>
    </>
  )
}
export default Register