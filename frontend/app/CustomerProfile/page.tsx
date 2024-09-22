import { FaTrophy, FaRegUserCircle } from 'react-icons/fa'; // Icons for better visualization
import Link from 'next/link';

interface CustomerProfileProps {
  points: number;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ points }) => {
  const membershipLevel =
    points >= 500 ? 'Gold' :
    points >= 200 ? 'Moderate' :
    'Low';

  const membershipColor =
    points >= 500 ? 'text-yellow-400' :
    points >= 200 ? 'text-blue-400' :
    'text-gray-300';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200">
      <div className="p-6 sm:p-8 max-w-xs sm:max-w-md rounded-3xl shadow-lg space-y-6 sm:space-y-8 transform transition-transform hover:scale-105 bg-white bg-opacity-70">
        <div className="flex items-center justify-center mb-4">
          <FaRegUserCircle className="text-6xl sm:text-7xl text-gray-700" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 drop-shadow-lg">Customer Profile</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
          <FaTrophy className={`${membershipColor} text-3xl sm:text-4xl`} />
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            Membership Level: <span className={`${membershipColor} drop-shadow-lg`}>{membershipLevel}</span>
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg sm:text-xl text-gray-800">
            <span className="font-semibold">Points Balance:</span> {points}
          </p>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link href="/purchase">
            <button className="bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700">
              Proceed to Purchase
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;





  