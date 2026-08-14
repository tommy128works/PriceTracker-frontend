import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import AddDealButton from "../components/AddDealButton";
import AddDealModal from "../components/AddDealModal";
// import { getDeals } from "../api/dealApi";

// type should be refactored into type folder
type Deal = {
  id: number;
  title: string;
  price: number;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDeals = async () => {
  //     try {
  //       const data = await getDeals();
  //       setDeals(data);
  //     } catch (error) {
  //       console.error("Failed to load deals", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDeals();
  // }, []);

  // if (loading) {
  //   return <p>Loading deals...</p>;
  // }

  return (
    <>
      <AppHeader />
      <div style={{ padding: "20px" }}>
        <h1>Deals</h1>
        <AddDealButton onClick={() => setShowAddDealModal(true)} />
        {showAddDealModal && (
          <AddDealModal onClose={() => setShowAddDealModal(false)} />
        )}

        {deals.length === 0 ? (
          <p>No deals yet.</p>
        ) : (
          <ul>
            {deals.map((deal) => (
              <li key={deal.id}>
                <strong>{deal.title}</strong> — ${deal.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
