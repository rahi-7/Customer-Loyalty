"use client"; // Ensure this is a client component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';
import { AxiosError } from 'axios';


const CheckPoints = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // State for phone number
  const [points, setPoints] = useState<number | null>(null); // State for points
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error
  const router = useRouter();

  const handleCheckPoints = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true); // Set loading to true

    try {
      const response = await axios.get(`http://localhost:5000/api/customers/get_customer_by_phone/${phoneNumber}`);
      setPoints(response.data.customer.loyalityPoints); // Adjust based on your response structure
      setError(null); // Clear any previous errors
    } catch (err: unknown) {
      if (err instanceof Error) {
        // If err is an instance of Error, access its message safely
        setError(err.message || 'Error fetching customer data');
      } else {
        // Handle the case where err is not an instance of Error
        setError('An unexpected error occurred');
      }
      setPoints(null); // Clear points if an error occurs
    } finally {
      setLoading(false); // Set loading to false
    }
    
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 to-green-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 drop-shadow-lg">Check Your Points</h1>

      <form onSubmit={handleCheckPoints} className="mb-6 w-full max-w-md">
        <label className="block text-lg font-semibold mb-2 text-gray-800">Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Check Points
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {points !== null && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Points</h2>
          <p className="text-gray-600"><strong>Phone Number:</strong> {phoneNumber}</p>
          <p className="text-gray-600"><strong>Points:</strong> {points}</p>
          
          {/* Redeem Points Button */}
          <button
            onClick={() => router.push('/PointsRedemption')} // Navigate to PointsRedemption
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 mt-4"
          >
            Redeem Points
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckPoints;





