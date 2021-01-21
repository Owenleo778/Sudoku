import './App.css';
import Board from './ui/board/sudokuBoard';
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "./ui/themes/themes";
import { CssBaseline, Box, Container, createStyles, Theme, makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./ui/margins/header";
import Footer from "./ui/margins/footer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            [theme.breakpoints.down("xs")]: {
                marginTop: theme.spacing(9),
                marginBottom: theme.spacing(2),
            },
            [theme.breakpoints.up("sm")]: {
                marginTop: theme.spacing(11),
                marginBottom: theme.spacing(3),
            },
        },
    })
);

const App: React.FC = () => {
    const { container } = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" height="100%">
                <Header />
                <Container className={container}>
                    <Board />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default App;
