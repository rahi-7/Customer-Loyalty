import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-green-200 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to Loyalty E-commerce</h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-md">
        Join our Customer Loyalty program to earn points for every purchase. 
        Redeem your points for discounts, exclusive offers, and more!
      </p>
      <Link href="/Login">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
}



