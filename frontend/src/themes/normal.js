import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#4a148c",
		},
		secondary: {
			main: "#fff",
			contrastText: "#0f0f0f",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#FCFCFC",
			paper: "#FCFCFC",
		},
		titleBar: {
			main: "#FCFCFC",
			contrastText: "#0f0f0f",
		},
	},
	typography: {
		fontFamily: ["Mulish", "Roboto", "Arial", "sans-serif"].join(","),
		button: {
			fontFamily: ["Mulish", "Roboto", "Arial", "sans-serif"].join(","),
		},
	},
});

export default theme;
