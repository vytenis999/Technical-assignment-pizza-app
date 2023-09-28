import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import OrdersPage from "../../features/orders/dashboards/OrdersPage";
import OrdersHistoryPage from "./../../features/ordersHistory/OrdersHistoryPage";
import SignInPage from "./../../features/signIn/SignInPage";
import RegisterPage from "../../features/register/RegisterPage";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <OrdersPage /> },
			{ path: "orderHistory", element: <OrdersHistoryPage /> },
			{ path: "signIn", element: <SignInPage /> },
			{ path: "register", element: <RegisterPage /> },
		],
	},
];

export const router = createBrowserRouter(routes);
