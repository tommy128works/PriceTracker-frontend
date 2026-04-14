import { api } from "./client";
import type { DealList } from "../types/dealList";

export const createDealList = async (name: string): Promise<DealList> => {
  const res = await api.post("/deal-lists", { name });
  return res.data;
};

export const getDealLists = async (): Promise<DealList[]> => {
  const res = await api.get("/deal-lists");
  return res.data;
};

export const updateDealList = async (
  listId: number,
  name: string,
): Promise<DealList> => {
  const res = await api.put(`/deal-lists/${listId}`, { name });
  return res.data;
};

export const deleteDealList = async (listId: number) => {
  await api.delete(`/deal-lists/${listId}`);
};
