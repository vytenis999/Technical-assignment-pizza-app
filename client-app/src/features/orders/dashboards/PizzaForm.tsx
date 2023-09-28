import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Select,
} from "@mui/material";
import { Size } from "../../../app/models/size";
import { Topping } from "../../../app/models/topping";
import { useState } from "react";
import { Pizza } from "../../../app/models/pizza";
import axios from "axios";

interface Props {
	sizes: Size[];
	toppings: Topping[];
	onPlaceOrder: (pizza: Pizza) => void;
}

export default function PizzaForm(props: Props) {
	const calculatePizzaPrice = async (pizza) => {
		try {
			const response = await axios.post(
				"https://localhost:7271/api/Orders/calculation",
				{
					pizzas: [pizza],
				}
			);
			if (
				response.data &&
				response.data.pizzaPrices &&
				response.data.pizzaPrices.length > 0
			) {
				return response.data.pizzaPrices[0].price;
			}
			return 0;
		} catch (error) {
			console.error("Failed to calculate pizza price.", error);
			return 0;
		}
	};
	const [selectedSize, setSelectedSize] = useState<number>(1);
	const [selectedToppings, setSelectedToppings] = useState<number[]>([]);

	return (
		<div>
			<div className="box">
				<div className="head">
					<h2>Make your pizza:</h2>
					<h3>Sizes</h3>
					<FormControl fullWidth>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={selectedSize}
							label="Size"
							onChange={(event) =>
								setSelectedSize(event.target.value as number)
							}
						>
							{props.sizes.map((size) => (
								<MenuItem value={size.id} key={size.id}>
									{size.name} | {size.diameter}cm | {size.price} eur
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="bod">
					<h3>Toppings</h3>
					<div className="list">
						<FormGroup>
							{props.toppings.map((topping) => (
								<FormControlLabel
									control={
										<Checkbox
											checked={selectedToppings.includes(topping.id)}
											onChange={() => {
												const newToppings = selectedToppings.includes(
													topping.id
												)
													? selectedToppings.filter((id) => id !== topping.id)
													: [...selectedToppings, topping.id];
												setSelectedToppings(newToppings);
											}}
										/>
									}
									label={topping.name}
									key={topping.id}
								/>
							))}
						</FormGroup>
					</div>
				</div>
				<div className="foot">
					<Button
						variant="contained"
						onClick={async () => {
							if (selectedSize) {
								const pizzaTotalPrice = await calculatePizzaPrice({
									pizzaSizeId: selectedSize,
									toppingsIds: selectedToppings,
								});
								props.onPlaceOrder({
									pizzaSizeId: selectedSize,
									toppingsIds: selectedToppings,
									pizzaTotalPrice: pizzaTotalPrice,
								});
							}
						}}
					>
						Place to order
					</Button>
				</div>
			</div>
		</div>
	);
}
