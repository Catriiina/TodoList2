import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeThemeAC, ThemeMode} from "../state/app-reducer";
import {getTheme} from "../theme/theme";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "./MenuButton";
import Switch from "@mui/material/Switch";
import React from "react";

export const Header = () => {
    const themeMode = useSelector<AppRootStateType, ThemeMode>(state => state.theme.themeMode);

    const dispatch = useDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static" sx={{ marginBottom: '30px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton>Faq</MenuButton>
                    <Switch color="default" onChange={changeModeHandler} checked={themeMode === 'dark'} />
                </div>
            </Toolbar>
        </AppBar>
    )
}