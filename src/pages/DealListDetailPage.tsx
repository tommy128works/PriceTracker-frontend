import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDealLists,
  // addDealToList,
  // deleteDealFromList,
} from "../api/dealListApi";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

type DealListItem = {
  dealId: number;
  listId: number;
  note?: string;
};

export default function DealListDetailPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const { id } = useParams();
  const listId = Number(id);

  const [items, setItems] = useState<DealListItem[]>([]);
  const [listName, setListName] = useState("");

  const handleLogout = async () => {
      await logout();
      setAccessToken(null);
      navigate("/login");
      console.log("Logged out, go to /");
    };

  // fetch single list
  const fetchList = async () => {
    const lists = await getDealLists();
    const list = lists.find((l) => l.id === listId);

    if (list) {
      // setItems(list.items);
      setListName(list.name);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  const handleAdd = async () => {
    const dealId = prompt("Deal ID?");
    const note = prompt("Note?");

    if (!dealId) return;

    // await addDealToList(listId, Number(dealId), note || "");
    fetchList();
  };

  const handleDelete = async (dealId: number) => {
    // await deleteDealFromList(listId, dealId);
    fetchList();
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
            Deal #{item.dealId} — {item.note}
            <button onClick={() => handleDelete(item.dealId)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
