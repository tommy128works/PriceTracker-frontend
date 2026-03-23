import type { DealListItem } from "./dealListItem";

export type DealList = {
    id: number;
    name: string;
    items: DealListItem[];
};