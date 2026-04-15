import { useEffect, useState } from "react";
import {
  createDealList,
  getDealLists,
  updateDealList,
  deleteDealList,
} from "../api/dealListApi";
import type { DealList } from "../types/dealList/dealList";

export default function DealListsPage() {
  const [lists, setLists] = useState<DealList[]>([]);

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
    // fetchLists();
  };

  return (
    <div style={{ padding: "20px" }}>
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
          }}
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
