import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";

const defaultTheme = createTheme({
	palette: {
		primary: { main: "#ffffff" },
		text: {
			primary: "#ffffff",
			secondary: "#ffffff80",
		},
		background: {
			default: "#000000",
		},
	},
	typography: {
		fontFamily: "Roboto",
		fontSize: 16,
		h1: {
			fontSize: 54,
		},
		h5: {
			fontSize: 24,
		},
		h6: {
			fontSize: 20,
		},
	},
});

export default function Layout({ children }: { children?: ReactNode }){
	return (
		<>
			<ThemeProvider theme={ defaultTheme }>
				<CssBaseline />
				{ children }
			</ThemeProvider>
		</>
	);
}
