import axios from "axios";
import { useEffect, useState } from "react";
import { Topping } from "../../../app/models/topping";
import { Size } from "../../../app/models/size";
import PizzaForm from "./PizzaForm";
import PizzasList from "./PizzasList";
import { Pizza } from "../../../app/models/pizza";
import agent from "../../../app/api/agent";

export default function OrdersPage() {
	const [toppings, setToppings] = useState<Topping[]>([]);
	const [sizes, setSizes] = useState<Size[]>([]);
	const [totalOrderPrice, setTotalOrderPrice] = useState(0);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	function resetAll() {
		setTotalOrderPrice(0);
		setPizzas([]);
	}

	useEffect(() => {
		agent.Toppings.list().then((response) => {
			setToppings(response);
		});
	}, []);

	useEffect(() => {
		axios
			.get<Size[]>("https://localhost:7271/api/Pizzas/sizes")
			.then((response) => {
				setSizes(response.data);
			});
	}, []);

	return (
		<div>
			<main className="main">
				<PizzaForm
					sizes={sizes}
					toppings={toppings}
					onPlaceOrder={(pizza) => {
						axios
							.post("https://localhost:7271/api/Orders/calculation", {
								pizzas: [...pizzas, pizza],
							})
							.then((response) => {
								setTotalOrderPrice(response.data.totalPrice);
								setPizzas((prevPizzas) => [...prevPizzas, pizza]);
							})
							.catch((error) => {
								console.error(error);
							});
					}}
				/>
				<PizzasList
					pizzas={pizzas}
					sizes={sizes}
					toppings={toppings}
					totalOrderPrice={totalOrderPrice}
					setTotalOrderPrice={setTotalOrderPrice}
					resetAll={resetAll}
					setPizzas={setPizzas}
				/>
			</main>
		</div>
	);
}
