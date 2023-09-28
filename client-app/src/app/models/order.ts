import { Pizza } from "./pizza";

export interface Order {
	pizzas: Pizza[];
	orderTotalPrice: number;
}
