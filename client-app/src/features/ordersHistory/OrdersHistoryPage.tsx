import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

const formatDate = (rawDate) => {
	const date = new Date(rawDate);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")} ${String(
		date.getHours()
	).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
		date.getSeconds()
	).padStart(2, "0")}`;
};

const PizzaListCell = ({ pizzas }) => (
	<div style={{ maxHeight: "100%", overflowY: "auto", width: "100%" }}>
		{pizzas.map((pizza, index) => (
			<div key={`${pizza.pizzaSizeId}-${index}`} style={{ margin: "2px 0" }}>
				<strong>{pizza.pizzaSizeName}</strong>:{" "}
				{pizza.toppings.map((topping) => topping.toppingName).join(", ")} ($
				{pizza.pizzaTotalPrice}){index !== pizzas.length - 1 && ","}
			</div>
		))}
	</div>
);

export default function OrdersHistoryPage() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		agent.Orders.get()
			.then((data) => setOrders(data))
			.catch((error) => console.error("Error fetching orders:", error));
	}, []);

	const columns = [
		{ field: "id", headerName: "Order ID", width: 150 },
		{
			field: "orderDate",
			headerName: "Order Date",
			width: 200,
			valueGetter: (params) => formatDate(params.value),
		},
		{ field: "orderTotalPrice", headerName: "Total Price", width: 150 },
		{
			field: "pizzas",
			headerName: "Pizzas",
			width: 400,
			renderCell: (params) => <PizzaListCell pizzas={params.value} />,
		},
	];

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid rows={orders} columns={columns} rowHeight={150} />
		</div>
	);
}
