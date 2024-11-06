import React, { useCallback } from 'react';
import { TasksStateType, TodoList } from "./TodoList/TodoList";
import { AddItemForm } from "./Components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { MenuButton } from "./Components/MenuButton";
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeFilterAC, updateTodolistAC, removeTodolistAC } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/task-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { getTheme } from "./theme/theme";
import { changeThemeAC } from "./state/app-reducer";

type ThemeMode = 'dark' | 'light';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

function App() {
    const themeMode = useSelector<AppRootStateType, ThemeMode>(state => state.theme.themeMode);
    const theme = getTheme(themeMode);
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
    };

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todoListId);
        dispatch(action);
    }, [dispatch]);

    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        const action = changeFilterAC(todoListId, filter);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todoListId: string) => {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, title);
        dispatch(action);
    }, [dispatch]);

    const updateTodolist = useCallback((todoListId: string, title: string) => {
        const action = updateTodolistAC(todoListId, title);
        dispatch(action);
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
            <Container fixed>
                <Grid container sx={{ marginBottom: '30px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={8}>
                    {todoLists.map(tl => (
                        <Grid key={tl.id}>
                            <Paper sx={{ padding: '20px' }}>
                                <TodoList
                                    key={tl.id}
                                    title={tl.title}
                                    todoListId={tl.id}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    updateTodolist={updateTodolist}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
