import axios, { AxiosResponse } from "axios";
import { Topping } from "./../models/topping";
import { Order } from "../models/order";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { OrderToGet } from "../models/orderToGet";

axios.defaults.baseURL = "http://localhost:7271/api";

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Toppings = {
	list: () => requests.get<Topping[]>("/Pizzas/toppings"),
};

const Orders = {
	create: (order: Order) => axios.post<void>("/Orders", order),
	get: () => requests.get<OrderToGet[]>("/Orders"),
};

const Account = {
	current: () => requests.get<User>("/Account"),
	login: (user: UserFormValues) => requests.post<User>("/Account/login", user),
	register: (user: UserFormValues) =>
		requests.post<User>("/Account/register", user),
};

const agent = {
	Toppings,
	Orders,
	Account,
};

export default agent;
