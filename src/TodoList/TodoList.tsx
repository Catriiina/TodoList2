import React, { useCallback } from "react";
import { MyButton } from '../Components/Button';
import { FilterValuesType } from "../state/todolists-reducer";
import { AddItemForm } from "../Components/AddItemForm";
import { EditableSpan } from "../Components/EditableSpan";
import List from '@mui/material/List';
import { Task } from "../Components/Task";
import { TaskStateType } from "../state/task-reducer";
import { FilterTasksButtons } from '../Components/FilterTasksButtons';

type TodoListPropsType = {
    title: string;
    todoListId: string;
    tasks: TaskStateType[];
    filter: FilterValuesType;
    removeTask: (taskId: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todoListId: string) => void;
    changeFilter: (filter: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
    updateTodolist: (todoListId: string, title: string) => void;
};

export type TasksStateType = {
    [key: string]: TaskStateType[];
};

export const TodoList = React.memo(({
                                        title, todoListId, tasks,
                                        filter, removeTask, addTask,
                                        changeTaskStatus, changeTaskTitle,
                                        changeFilter, removeTodolist, updateTodolist
                                    }: TodoListPropsType) => {

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todoListId);
    }, [todoListId, addTask]);

    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(taskId, todoListId);
    }, [todoListId, removeTask]);

    const changeTaskStatusHandler = useCallback((taskId: string, taskStatus: boolean) => {
        changeTaskStatus(taskId, taskStatus, todoListId);
    }, [todoListId, changeTaskStatus]);

    const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
        changeTaskTitle(todoListId, taskId, title);
    }, [todoListId, changeTaskTitle]);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todoListId);
    }, [todoListId, removeTodolist]);

    const updateTodolistHandler = useCallback((title: string) => {
        updateTodolist(todoListId, title);
    }, [todoListId, updateTodolist]);

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

    return (
        <div className="todolist">
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "15px" }}>
                <h3 style={{ margin: "0" }}>
                    <EditableSpan value={title} onChange={updateTodolistHandler} />
                </h3>
                <MyButton title={"✕"} onClick={removeTodolistHandler} />
            </div>
            <AddItemForm addItem={addTaskCallback} />
            <List>
                {tasksForTodolist.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        isDone={task.isDone}
                        onStatusChange={changeTaskStatusHandler}
                        onTitleChange={changeTaskTitleHandler}
                        onTaskRemove={removeTaskHandler}
                    />
                ))}
            </List>
            <FilterTasksButtons filter={filter} changeFilter={changeFilter} todoListId={todoListId} />
        </div>
    );
});