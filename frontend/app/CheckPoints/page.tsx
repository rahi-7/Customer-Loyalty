'use client';

import { useState } from 'react';
import axios from 'axios';

const CheckPoints = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckPoints = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/get-customer`, {
        phoneNumber,
      });
      setCustomer(response.data.customer); // Adjust to match your API response format
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setError(err.response?.data.message || 'Error fetching customer data');
      setCustomer(null); // Clear customer data if error occurs
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Check Your Points</h1>
      <form onSubmit={handleCheckPoints} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full font-medium hover:bg-blue-700 transition ease-in-out duration-300"
        >
          Get Customer
        </button>
      </form>

      {customer && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Details</h2>
          <div className="space-y-2">
            <p className="text-gray-600"><strong>Full Name:</strong> {customer.fullName}</p>
            <p className="text-gray-600"><strong>Phone Number:</strong> {customer.phoneNumber}</p>
            <p className="text-gray-600"><strong>Loyalty Points:</strong> {customer.loyaltyPoints}</p>
          </div>
          <button
            className="mt-6 bg-green-600 text-white px-4 py-3 rounded-lg w-full font-medium hover:bg-green-700 transition ease-in-out duration-300"
            onClick={() => window.location.href = '/purchase'} // Change to your purchase page
          >
            Proceed to Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckPoints;

