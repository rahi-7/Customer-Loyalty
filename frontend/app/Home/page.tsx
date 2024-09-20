import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Loyalty E-commerce</h1>
      <p className="text-lg mb-4">Shop and earn points for your purchases!</p>
      <div className="space-x-4">
        <Link href="/shop">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Shop</button>
        </Link>
        <Link href="/redeem">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Redeem Points</button>
        </Link>
      </div>
    </div>
  );
}


