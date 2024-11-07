import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {  useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { getTheme } from "./theme/theme";
import {Header} from "./Components/Header";
import {Main} from "./Components/Main";

type ThemeMode = 'dark' | 'light';

function App() {
    const themeMode = useSelector<AppRootStateType, ThemeMode>(state => state.theme.themeMode);

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
