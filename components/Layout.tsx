import React, { ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
	palette: {
		primary: { main: "#ffffff" },
		text: {
			primary: "#ffffff",
			secondary: "#FFFFFF80",
		},
		background: {
			default: "#000000",
		},
	},
	typography: {
		fontFamily: "Roboto",
		fontSize: 16,
		h5:{
			fontSize: 24,
		},
		h1: {
			fontSize: 54,
		}
	}
});

export default function Layout({ children }: { children?: ReactNode}) {
	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</>
	);
}
