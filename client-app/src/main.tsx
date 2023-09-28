import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import { router } from "./app/router/Routes.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
