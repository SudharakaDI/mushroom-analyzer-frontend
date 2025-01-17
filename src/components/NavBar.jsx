import { useState } from "react";
import { Box, Link, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activePath, setActivePath] = useState(window.location.pathname);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Production", href: "/production" },
        { label: "Sales", href: "/sales" },
        { label: "Income", href: "/income" },
        { label: "Expense", href: "/expense" },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLinkClick = (href) => {
        setActivePath(href);
        setMobileOpen(false);
    };

    const linkStyle = (href) => ({
        color: "black",
        textDecoration: "none",
        fontWeight: activePath === href ? "bold" : "normal",
        position: "relative",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: -4,
            left: 0,
            width: activePath === href ? "100%" : 0,
            height: "2px",
            backgroundColor: "black",
            transition: "width 0.3s ease",
        },
        "&:hover::after": {
            width: "100%",
        },
    });

    return (
        <Box
            sx={{
                "@media (max-width:900px)": {
                    ".desktop-nav": { display: "none" },
                    ".mobile-toggle": { display: "block" },
                },
                "@media (min-width:901px)": {
                    ".mobile-toggle": { display: "none" },
                    ".desktop-nav": { display: "flex", justifyContent: "center", gap: 4 },
                },
            }}
        >
            <IconButton
                className='mobile-toggle'
                onClick={handleDrawerToggle}
                sx={{
                    position: "fixed",
                    top: 16,
                    left: 16,
                    zIndex: 1300,
                    backgroundColor: "white", // Circle background color
                    borderRadius: "50%", // Makes the button circular
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds drop shadow
                    width: 48, // Ensures the button is square
                    height: 48, // Ensures the button is square
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Background color on hover
                    },
                }}
            >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Drawer
                anchor='left'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 240,
                        paddingTop: 4,
                    },
                }}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        sx={{
                            display: "block",
                            textAlign: "center",
                            py: 2,
                            color: activePath === item.href ? "#007BFF" : "black",
                            textDecoration: "none",
                            fontWeight: activePath === item.href ? "bold" : "normal",
                        }}
                        onClick={() => handleLinkClick(item.href)}
                    >
                        {item.label}
                    </Link>
                ))}
            </Drawer>

            <Box
                className='desktop-nav'
                sx={{
                    py: 2,
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                }}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        sx={linkStyle(item.href)}
                        onClick={() => handleLinkClick(item.href)}
                    >
                        {item.label}
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default NavBar;
