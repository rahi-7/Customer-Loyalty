"use client"; 

import { useEffect, useState } from 'react';
import axios from 'axios';

interface PointsRedemptionProps {
  points: number;
  onRedeem: () => void;
}

const PointsRedemption: React.FC<PointsRedemptionProps> = ({ points, onRedeem }) => {
  const handleRedeem = () => {
    if (points >= 10) {
      onRedeem();
    } else {
      alert('Not enough points to redeem.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-green-200">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Redeem Your Points</h3>
        <p className="text-lg text-gray-600 mb-6">
          You have <span className="font-semibold">{points}</span> points.
        </p>
        <button
          onClick={handleRedeem}
          className={`px-6 py-2 rounded-lg text-white ${
            points >= 10 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={points < 10}
        >
          Redeem 10 Points
        </button>
      </div>
    </div>
  );
};

export default PointsRedemption;


