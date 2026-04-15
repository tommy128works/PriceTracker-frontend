import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDealLists,
  // addDealToList,
  // deleteDealFromList,
} from "../api/dealListApi";

type DealListItem = {
  dealId: number;
  listId: number;
  note?: string;
};

export default function DealListDetailPage() {
  const { id } = useParams();
  const listId = Number(id);

  const [items, setItems] = useState<DealListItem[]>([]);
  const [listName, setListName] = useState("");

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
