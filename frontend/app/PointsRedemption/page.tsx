import React from 'react';
import Link from 'next/link';

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
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Redeem Your Points</h3>
      <p className="text-lg text-gray-600 mb-6">
        You have <span className="font-semibold">{points}</span> points.
      </p>
      <button
        onClick={handleRedeem}
        className={`px-6 py-2 rounded-lg text-white ${
          points >= 10 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={points < 10}
      >
        Redeem 10 Points
      </button>
    </div>
  );
};

export default PointsRedemption;
