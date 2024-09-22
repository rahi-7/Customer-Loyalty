"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const PointsRedemption = () => {
  const [points] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [redeemPoints, setRedeemPoints] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleRedeem = async () => {
    setError("");
    setMessage("");

    if (redeemPoints <= 0) {
      setError("Please enter a valid number of points to redeem.");
      return;
    }

    if (redeemPoints > points) {
      setError("Not enough points to redeem.");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/customers/redeem_points/${phoneNumber}/${redeemPoints}`
      );
      if (response.data.message) {
        setMessage(response.data.message);
        // onRedeemSuccess();
      }
    } catch (error: any) {
      if (error instanceof AxiosError)
        if (error.response) {
          setError(
            error.response.data.message ||
              `Server error: ${error.response.status}`
          );
        } else {
          setError("");
        }
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-green-200">
      <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">
          Redeem Your Points
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          You have <span className="font-semibold text-blue-500">{points}</span>{" "}
          points.
        </p>

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <input
          type="number"
          value={redeemPoints}
          onChange={(e) => setRedeemPoints(Number(e.target.value))}
          placeholder="Enter points to redeem"
          className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <button
          onClick={handleRedeem}
          className={`px-6 py-2 rounded-lg text-white ${
            redeemPoints > 0 && redeemPoints <= points && phoneNumber
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 cursor-not-allowed"
          } transition duration-200`}
          disabled={redeemPoints <= 0 || redeemPoints > points || !phoneNumber}
        >
          Redeem Points
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 w-full px-6 py-2 rounded-lg text-white bg-red-900 hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PointsRedemption;
