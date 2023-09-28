import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from "@mui/material";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

function SignInPage() {
	const { userStore } = useStore();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const credentials = {
			email: data.get("email") as string,
			password: data.get("password") as string,
		};
		console.log(credentials);

		// Call the login method from the userStore
		userStore.login(credentials);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					{/* TODO: Add an icon or image here if desired */}
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default observer(SignInPage);
