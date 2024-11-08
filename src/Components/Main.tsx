import React, {useCallback} from "react";
import {TodoList} from "../TodoList/TodoList";
import {
    addTodolistAC,
    changeFilterAC, FilterValuesType,
    removeTodolistAC,
    updateTodolistAC
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";


export const Main = () => {
    const todoLists = useAppSelector(state => state.todoLists)
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch();

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
    )
}