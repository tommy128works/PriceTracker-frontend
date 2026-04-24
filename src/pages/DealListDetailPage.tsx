import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDealListItems,
  // addDealToList,
  // deleteDealFromList,
} from "../api/dealListItemApi";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import type { DealListItemView } from "../types/dealListItem/dealListItemView";

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
  }, [id]);

  const handleAdd = async () => {
    const dealId = prompt("Deal ID?");
    const note = prompt("Note?");

    if (!dealId) return;

    // await addDealToList(listId, Number(dealId), note || "");
    // fetchList();
  };

  const handleDelete = async (dealId: number) => {
    // await deleteDealFromList(listId, dealId);
    // fetchList();
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
          <li key={item.dealId}>
            Name: {item.name}
            <br />
            Note: {item.note}
            <button onClick={() => handleDelete(item.dealId)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
