'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // Handle successful login
      console.log("Login successful:", response.data);
      // Redirect to the shop page
      router.push('/Shop'); // Add this line to redirect
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data?.error || error.message);
        setError(error.response?.data?.error || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred");
      }
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-green-300 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Login</h1>
      <div className="flex items-center mb-4">
        <FaUserCircle className="text-6xl text-gray-600" />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-700 text-center">
        Don't have an account?{' '}
        <Link href="/SignUp" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}



