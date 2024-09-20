import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

const Shop: React.FC = () => {
  const [points, setPoints] = useState<number>(0);

  const handlePurchase = (price: number) => {
    const earnedPoints = price / 10;
    setPoints(points + earnedPoints);
    alert(`You earned ${earnedPoints} points!`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center bg-white p-4 shadow rounded">
            <span>{product.name} - ${product.price}</span>
            <button
              onClick={() => handlePurchase(product.price)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xl">You have {points} points.</p>
    </div>
  );
};

export default Shop;


