"use client"; // Add this line to mark the component as a Client Component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/create_user', {
        firstName,
        middleName,
        lastName,
        email,
        password,
        phoneNumber,
      });
  
      // Check for specific status codes
      if (response.status === 201) {
        // User created successfully
        router.push('/Login');
      } else {
        // Handle other statuses if needed
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err: any) {
      // Handle errors from the server
      if (err.response) {
        // The server responded with a status code
        console.error('Error response:', err.response.data);
        console.error('Status code:', err.response.status);
        setError(err.response.data.message || 'Sign up failed');
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        setError('No response from server. Please try again later.');
      } else {
        // Something else caused the error
        console.error('Error:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-green-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Sign Up
        </button>
      </form>
    </div>
  );
}



