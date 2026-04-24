import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createDealListItem,
  getDealListItems,
  updateDealListItem,
  deleteDealListItem,
} from "../api/dealListItemApi";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import type { DealListItemView } from "../types/dealListItem/dealListItemView";
import type { Unit } from "../types/unit";

export default function DealListDetailPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const { id } = useParams();
  const listId = Number(id);

  const [items, setItems] = useState<DealListItemView[]>([]);
  const [listName, setListName] = useState("");

  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    navigate("/login");
    console.log("Logged out, go to /");
  };

  const fetchItems = async () => {
    try {
      const data = await getDealListItems(listId);
      setItems(data);
    } catch (error) {
      console.error("Error fetching deal list items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    const name = prompt("Deal name?") || "";
    const amountCents = prompt("Amount in cents?") || "0";
    const currency = "CAD";
    const amount = prompt("Amount?") || "0";
    const unit = (prompt("Unit? (EACH, G, ML)") || "EACH") as Unit;
    const note = prompt("Note?") || "";

    const newDealListItem = await createDealListItem(
      {
        name,
        amountCents: Number(amountCents),
        currency,
        amount: Number(amount),
        unit,
        note,
      },
      listId,
    );
    setItems((prev) => [...prev, newDealListItem]);
  };

  const handleUpdateItem = async (itemId: number) => {
    const note = prompt("New note") || "";

    const updatedItem = await updateDealListItem({ note }, listId, itemId);
    setItems((prev) =>
      prev.map((item) => (item.dealId === itemId ? updatedItem : item)),
    );
  };

  const handleDeleteItem = async (dealId: number) => {
    await deleteDealListItem(listId, dealId);
    setItems((prev) => prev.filter((item) => item.dealId !== dealId));
  };

  return (
    <div style={{ padding: 20 }}>
      <nav>
        <button onClick={handleLogout}>Logout</button> |
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <h1>📁 {listName}</h1>

      <button onClick={handleAdd}>➕ Add Deal</button>

      <ul>
        {items.map((item) => (
          <li
            key={item.dealId}
            style={{
              border: "1px solid gray",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            Name: {item.name}
            <br />
            Note: {item.note}
            <button onClick={() => handleDeleteItem(item.dealId)}>❌</button>
            <button onClick={() => handleUpdateItem(item.dealId)}>edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
