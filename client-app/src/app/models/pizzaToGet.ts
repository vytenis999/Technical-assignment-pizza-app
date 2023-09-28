import { ToppingToGet } from "./toppingToGet";

export interface PizzaToGet {
	PizzaSizeId: number;
	PizzaSizeName: string;
	PizzaTotalPrice: number;
	Toppings: ToppingToGet[];
}
