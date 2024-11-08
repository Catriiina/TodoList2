import {changeThemeAC} from "../state/app-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "./MenuButton";
import Switch from "@mui/material/Switch";
import React from "react";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectThemeMode} from "../Selectors/appSelectors";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()

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