import React from 'react';
import Link from 'next/link';

interface CustomerProfileProps {
  points: number;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ points }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Customer Profile</h2>
      <p className="text-lg text-gray-600">
        <span className="font-semibold">Points Balance:</span> {points}
      </p>
      <p className={`text-lg font-semibold ${points >= 50 ? 'text-yellow-500' : 'text-gray-500'}`}>
        Membership Level: {points >= 50 ? 'Gold' : 'Standard'}
      </p>
    </div>
  );
};

export default CustomerProfile;

  