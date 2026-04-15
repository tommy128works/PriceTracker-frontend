import { api } from "./client";
import type { CreateDealListRequest } from "../types/dealList/createDealListRequest";
import type { DealListView } from "../types/dealList/dealListView";
import type { UpdateDealListRequest } from "../types/dealList/updateDealListRequest";

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
  data: UpdateDealListRequest,
): Promise<DealListView> => {
  const res = await api.put(`/deal-lists/${data.id}`, { name: data.name });
  return res.data;
};

export const deleteDealList = async (listId: number) => {
  await api.delete(`/deal-lists/${listId}`);
};
