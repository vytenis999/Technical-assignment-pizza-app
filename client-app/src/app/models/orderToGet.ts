import { PizzaToGet } from "./pizzaToGet";

export interface OrderToGet {
	Id: number;
	OrderDate: Date;
	OrderTotalPrice: number;
	Pizzas: PizzaToGet[];
}
