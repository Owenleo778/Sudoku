import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const darkTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "dark",
        },
    })
);

const lightTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "light",
        },
    })
);

export { darkTheme, lightTheme };