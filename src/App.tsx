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
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    })
);

const App: React.FC = () => {
    const { container } = useStyles();
    return (
        //use AppBar for header / footer
        <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <Box display="flex" flexDirection="column" height="100%" >
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
