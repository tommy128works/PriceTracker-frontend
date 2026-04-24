import type { Unit } from "../unit";
import type { Currency } from "../currency";

export type DealListItemView = {
  dealListItemId: number;
  dealListId: number;
  dealId: number;
  name: string;
  amountCents: number;
  currency: Currency;
  amount: number;
  unit: Unit;
  note: string;
};
