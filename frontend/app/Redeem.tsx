import { useState } from 'react';

export default function Redeem() {
  const [points, setPoints] = useState(0);
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = () => {
    if (points >= 10) {
      setPoints(points - 10);
      setRedeemed(true);
      alert('You have successfully redeemed 10 points for a discount!');
    } else {
      alert('Not enough points to redeem.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Redeem Points</h1>
      <p className="mb-4">You have {points} points.</p>
      <button
        onClick={handleRedeem}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Redeem 10 Points for Discount
      </button>
      {redeemed && <p className="mt-4 text-lg text-green-600">Congratulations! You've redeemed a discount.</p>}
    </div>
  );
}
