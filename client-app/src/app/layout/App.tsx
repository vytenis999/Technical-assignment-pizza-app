import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function App() {
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	return (
		<div>
			<NavBar />
			<Outlet />
		</div>
	);
}

export default observer(App);
