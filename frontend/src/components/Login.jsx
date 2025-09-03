import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3003/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      // You can handle token or user info here
      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-indigo">
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span> Login
      </p>
      <div className="w-full">
        <p>Email</p>
        <input onChange={e => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
      </div>
      <div className="w-full">
        <p>Password</p>
        <input onChange={e => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        Login
      </button>
    </form>
  );
};

export default Login;