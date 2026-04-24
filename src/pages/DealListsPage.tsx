import { useEffect, useState } from "react";
import {
  createDealList,
  getDealLists,
  updateDealList,
  deleteDealList,
} from "../api/dealListApi";
import type { DealListView } from "../types/dealList/dealListView";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function DealListsPage() {
  const navigate = useNavigate();
  const [lists, setLists] = useState<DealListView[]>([]);
  const { setAccessToken } = useAuth();

  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    navigate("/login");
    console.log("Logged out, go to /");
  };

  const fetchLists = async () => {
    try {
      const data = await getDealLists();
      setLists(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleCreateList = async () => {
    const name = prompt("Enter list name:");
    if (!name) return;
    const newList = await createDealList({ name });
    setLists((prev) => [...prev, newList]);
  };

  const handleUpdateList = async (listId: number) => {
    const name = prompt("Enter new list name:");
    if (!name) return;

    const updatedList = await updateDealList({ id: listId, name });
    setLists((prev) =>
      prev.map((list) => (list.id === listId ? updatedList : list)),
    );
  };

  const handleDeleteList = async (listId: number) => {
    await deleteDealList(listId);
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav>
        <button onClick={handleLogout}>Logout</button> |
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <h1>📋 Your Deal Lists</h1>

      <button onClick={handleCreateList} style={{ marginBottom: "20px" }}>
        ➕ Create New List
      </button>

      {lists.length === 0 && <p>No lists yet.</p>}

      {lists.map((list) => (
        <div
          key={list.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "blue",
          }}
          onClick={() => navigate(`/deal-lists/${list.id}`)}
        >
          <h2>{list.name}</h2>
          <button onClick={() => handleUpdateList(list.id)}>
            ✏️ Edit List
          </button>
          <button onClick={() => handleDeleteList(list.id)}>
            ❌ Delete List
          </button>
        </div>
      ))}
    </div>
  );
}
