import PointsRedemption from "../../components/PointsRedemption";

export default function PointsRedemptionPage() {
  // You might want to fetch the points here or pass them from a parent component
  const points = 1000; // Example value, replace with actual data fetching logic
  const handleRedeemSuccess = () => {
    console.log("Redemption successful");
  };

  return (
    <PointsRedemption points={points} onRedeemSuccess={handleRedeemSuccess} />
  );
}
