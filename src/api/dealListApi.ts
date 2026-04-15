import { api } from "./client";
import type { DealList } from "../types/dealList/dealList";
import type { CreateDealListRequest } from "../types/dealList/createDealListRequest";
import type { DealListView } from "../types/dealList/dealListView";

export const createDealList = async (
  data: CreateDealListRequest,
): Promise<DealListView> => {
  const res = await api.post("/deal-lists", data);
  return res.data;
};

export const getDealLists = async (): Promise<DealListView[]> => {
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
