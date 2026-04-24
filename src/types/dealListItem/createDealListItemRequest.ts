import type { Unit } from "../unit";
import type { Currency } from "../currency";

export type CreateDealListItemRequest = {
  name: string;
  amountCents: number;
  currency: Currency;
  amount: number;
  unit: Unit;
  note: string;
};
