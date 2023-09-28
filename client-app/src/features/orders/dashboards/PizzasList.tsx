import { Button } from "@mui/material";
import { Pizza } from "../../../app/models/pizza";
import { Size } from "../../../app/models/size";
import { Topping } from "../../../app/models/topping";
import { Order } from "../../../app/models/order";
import agent from "../../../app/api/agent";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";

interface Props {
	pizzas: Pizza[];
	sizes: Size[];
	toppings: Topping[];
	totalOrderPrice: number;
	resetAll: () => void;
	setPizzas: (pizzas: Pizza[]) => void;
	setTotalOrderPrice: (price: number) => void;
}

export default function PizzasList({
	pizzas,
	sizes,
	toppings,
	totalOrderPrice,
	setTotalOrderPrice,
	resetAll,
	setPizzas,
}: Props) {
	const getSizeName = (id: number) => {
		const size = sizes.find((s) => s.id === id);
		return size ? size.name : "Unknown Size";
	};

	const [token, setToken] = useState("");

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			setToken(jwt);
		}
	}, []);

	const { userStore } = useStore();

	const onDelete = (index: number) => {
		const priceOfRemovedPizza = pizzas[index].pizzaTotalPrice;
		const updatedTotalPrice = totalOrderPrice - priceOfRemovedPizza;
		setTotalOrderPrice(updatedTotalPrice);
		const updatedPizzas = [...pizzas];
		updatedPizzas.splice(index, 1);
		setPizzas(updatedPizzas);
	};

	const getToppingName = (id: number) => {
		const topping = toppings.find((t) => t.id === id);
		return topping ? topping.name : "Unknown Topping";
	};

	return (
		<>
			<div className="box">
				<div className="head">
					<h2>Your Order:</h2>
					<h3>Quantity: {pizzas.length}</h3>
				</div>
				<div className="bod">
					<ul className="list">
						{pizzas.map((pizza, idx) => (
							<li key={idx}>
								<div className="pizza-cont">
									<h3>{getSizeName(pizza.pizzaSizeId)} Pizza</h3>
									<Button
										variant="contained"
										color="error"
										onClick={() => onDelete(idx)}
									>
										X
									</Button>
								</div>
								<div className="toppings">
									{pizza.toppingsIds.map((toppingId, idx) => (
										<p key={idx}>
											<span>📌</span>
											<span>{getToppingName(toppingId)}</span>
										</p>
									))}
								</div>
								<h4>Pizza price: {pizza.pizzaTotalPrice} eur</h4>
							</li>
						))}
					</ul>
				</div>
				<div className="foot">
					<div className="total-order">
						<Button
							variant="contained"
							onClick={() => {
								const finalOrder: Order = {
									pizzas: pizzas || [],
									orderTotalPrice: totalOrderPrice,
								};
								agent.Orders.create(finalOrder).then(() => {
									resetAll();
								});
							}}
						>
							Submit order
						</Button>
						<h2>Total price: {totalOrderPrice} eur</h2>
					</div>
				</div>
			</div>
		</>
	);
}
