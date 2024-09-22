"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';



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
  const [cartCount, setCartCount] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const router = useRouter();

  // Load points and cart count from local storage on mount
  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    const storedCartCount = localStorage.getItem('cartCount');

    if (storedPoints) {
      setPoints(Number(storedPoints));
    }
    if (storedCartCount) {
      setCartCount(Number(storedCartCount));
    }
  }, []);

  // Update local storage whenever points or cart count changes
  useEffect(() => {
    localStorage.setItem('points', points.toString());
    localStorage.setItem('cartCount', cartCount.toString());
  }, [points, cartCount]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/purchase`, {
        customerPhoneNumber: phoneNumber,
        numberOfItems: cartCount,
        totalAmount: points * 10,
      });
      alert(`Purchase successful! You have earned ${response.data.customer.loyalityPoints} points.`);
      console.log(response.data);
      setPhoneNumber('');
      setCartCount(0);
      setPoints(0);
      localStorage.removeItem('points');
      localStorage.removeItem('cartCount');
    } catch (error) {
      alert('Error during purchase. Please try again.');
    }
  };

  const handleAddToCart = (price: number) => {
    const earnedPoints = price / 10;
    setPoints(points + earnedPoints);
    setCartCount(cartCount + 1);
    alert(`You earned ${earnedPoints} points!`);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 to-green-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 drop-shadow-lg">Welcome to Our Shop!</h1>
      <ul className="space-y-4 w-full max-w-xl">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <span className="text-lg font-semibold text-gray-800">
              {product.name} - <span className="text-gray-600">${product.price}</span>
            </span>
            <button
              onClick={() => handleAddToCart(product.price)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xl font-semibold text-gray-800">You have {cartCount} products in your cart.</p>
      <p className="mt-2 text-xl font-semibold text-gray-800">You have {points} points.</p>

      <div className="mb-6 w-full max-w-xs">
        <label className="block text-lg font-semibold mb-2 text-gray-800">Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      <button
        onClick={handlePurchase}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 mb-6"
      >
        Purchase
      </button>

      <button
        onClick={() => {
          router.push('/CheckPoints')
        }}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
      >
        Check Points
      </button>
    </div>
  );
};

export default Shop;








