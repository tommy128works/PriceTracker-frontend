import { useEffect, useState } from "react";
// import { getDeals } from "../api/dealApi";

// type should be refactored into type folder
type Deal = {
  id: number;
  title: string;
  price: number;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        console.error("Failed to load deals", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <p>Loading deals...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deals</h1>

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
  );
}
