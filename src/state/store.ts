
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todoListsReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    theme: appReducer
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store