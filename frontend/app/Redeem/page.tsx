"use client"; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Redeem() {
  const [points, setPoints] = useState(0); // Initial points
  const [redeemed, setRedeemed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [purchaseMade, setPurchaseMade] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setPhoneSubmitted(true);
      alert(`Your phone number ${phoneNumber} has been submitted! You can now earn points by shopping.`);
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  const handlePurchase = () => {
    if (phoneSubmitted) {
      const earnedPoints = 20; // Simulate that the purchase gives 20 points
      setPoints(points + earnedPoints);
      setPurchaseMade(true);
      setTimeout(() => setPurchaseMade(false), 3000); // Reset message after 3 seconds
      alert(`You earned ${earnedPoints} points from your purchase!`);
    } else {
      alert('Please submit your phone number before making a purchase.');
    }
  };

  const handleRedeem = () => {
    if (points >= 10) {
      setPoints(points - 10);
      setRedeemed(true);
      setTimeout(() => setRedeemed(false), 5000); // Reset after 5 seconds
      alert('You have successfully redeemed 10 points for a discount!');
    } else {
      alert('Not enough points to redeem.');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-200 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Redeem Your Points</h1>

        {/* Phone Number Submission Form */}
        <form onSubmit={handlePhoneSubmit} className="mt-8">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
            Enter Your Phone Number to Connect with the Shop:
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="e.g., 123-456-7890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg w-full"
          >
            Submit Phone Number
          </button>
        </form>

        {phoneSubmitted && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-green-600">You are now eligible to earn points!</h2>
            <button
              onClick={handlePurchase}
              className="bg-yellow-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-lg w-full"
            >
              Make a Purchase (Earn 20 Points)
            </button>
            {purchaseMade && (
              <p className="mt-4 text-lg text-yellow-600 font-semibold">
                🎉 You earned 20 points!
              </p>
            )}

            <p className="mt-6 text-xl">You have {points} points.</p>

            {/* Redeem Section */}
            <button
              onClick={handleRedeem}
              className="bg-green-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg w-full"
              disabled={points < 10}
            >
              Redeem 10 Points for Discount
            </button>

            {redeemed && (
              <p className="mt-4 text-lg text-green-600 font-semibold animate-pulse">
                🎉 Congratulations! You've redeemed a discount.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



