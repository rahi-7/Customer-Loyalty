import React from 'react';
import Link from 'next/link';

interface Customer {
  name: string;
  points: number;
}

interface ShopkeeperDashboardProps {
  customers: Customer[];
}

const ShopkeeperDashboard: React.FC<ShopkeeperDashboardProps> = ({ customers }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Shopkeeper Dashboard</h2>
      <ul className="space-y-4">
        {customers.map((customer, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
            <span className="text-lg font-semibold text-gray-700">{customer.name}</span>
            <span className="text-lg text-blue-500">Points: {customer.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopkeeperDashboard;
