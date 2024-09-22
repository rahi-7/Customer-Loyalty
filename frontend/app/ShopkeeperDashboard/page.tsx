"use client"; 

interface Customer {
  name: string;
  points: number;
}

interface ShopkeeperDashboardProps {
  customers: Customer[];
}

const ShopkeeperDashboard: React.FC<ShopkeeperDashboardProps> = ({ customers = [] }) => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 to-green-200 min-h-screen flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Shopkeeper Dashboard</h2>
        <ul className="space-y-4">
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <span className="text-lg font-semibold text-gray-700">{customer.name}</span>
                <span className="text-lg text-blue-500">Points: {customer.points}</span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No customers available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
