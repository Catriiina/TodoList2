import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from "./theme/theme";
import {Header} from "./Components/Header";
import {Main} from "./Components/Main";
import {useAppSelector} from "./hooks/useAppSelector";
import {selectThemeMode} from "./Selectors/appSelectors";

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
