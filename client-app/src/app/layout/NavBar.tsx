import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { store, useStore } from "../stores/store";

const pages = [{ title: "Order", link: "/" }];
const settings = [
	{ title: "Orders history", link: "/orderHistory" },
	{ title: "Logout", link: "/" },
];

const settings1 = [
	{ title: "Login", link: "/signIn" },
	{ title: "Register", link: "/register" },
];

function NavBar() {
	const { userStore } = useStore();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" style={{ background: "#edc84b" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							color: "red",
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							fontSize: "24px",
							textTransform: "uppercase",
							textDecoration: "none",
						}}
					>
						Custom Pizza Co.
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.title}
									component={Link}
									to={page.link}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">{page.title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "red",
							textTransform: "uppercase",
							textDecoration: "none",
						}}
					>
						Custom Pizza Co.
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.title}
								component={Link}
								to={page.link}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "red", display: "block" }}
							>
								{page.title}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								size="large"
								color="error"
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<AccountCircle />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{userStore.isLoggedIn
								? settings.map((setting) => (
										<MenuItem
											key={setting.title}
											component={Link}
											to={setting.link}
											onClick={() => {
												if (setting.title === "Logout") {
													userStore.logout();
												}
												handleCloseUserMenu();
											}}
										>
											<Typography textAlign="center">
												{setting.title}
											</Typography>
										</MenuItem>
								  ))
								: settings1.map((setting) => (
										<MenuItem
											key={setting.title}
											component={Link}
											to={setting.link}
											onClick={handleCloseUserMenu}
										>
											<Typography textAlign="center">
												{setting.title}
											</Typography>
										</MenuItem>
								  ))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default observer(NavBar);
