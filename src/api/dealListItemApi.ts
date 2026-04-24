import { api } from "./client";
import type { CreateDealListItemRequest } from "../types/dealListItem/createDealListItemRequest";
import type { DealListItemView } from "../types/dealListItem/dealListItemView";
import type { UpdateDealListItemRequest } from "../types/dealListItem/updateDealListItemRequest";

export const createDealListItem = async (
  data: CreateDealListItemRequest,
  listId: number,
): Promise<DealListItemView> => {
  const res = await api.post(`/deal-lists/${listId}/items`, data);
  return res.data;
};

export const getDealListItems = async (
  listId: number,
): Promise<DealListItemView[]> => {
  const res = await api.get(`/deal-lists/${listId}/items`);
  return res.data;
};

export const updateDealListItem = async (
  data: UpdateDealListItemRequest,
  listId: number,
  itemId: number,
): Promise<DealListItemView> => {
  const res = await api.put(`/deal-lists/${listId}/items/${itemId}`, data);
  return res.data;
};

export const deleteDealListItem = async (
  listId: number,
  itemId: number,
): Promise<void> => {
  await api.delete(`/deal-lists/${listId}/items/${itemId}`);
};
