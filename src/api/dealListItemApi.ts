import { api } from "./client";
import type { CreateDealListItemRequest } from "../types/dealListItem/createDealListItemRequest";
import type { DealListItemView } from "../types/dealListItem/dealListItemView";

export const getDealListItems = async (
  listId: number,
): Promise<DealListItemView[]> => {
  const res = await api.get(`/deal-lists/${listId}/items`);
  return res.data;
};
