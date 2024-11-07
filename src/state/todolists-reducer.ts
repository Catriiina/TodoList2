
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST',  payload: { title, todoListId: v1() } } as const
};

export const updateTodolistAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
}


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>
export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>


type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | UpdateTodolistActionType
    | ChangeFilterActionType;

const initialState: Array<TodolistType> = []

export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                { id: action.payload.todoListId, title: action.payload.title, filter: 'all' }
            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
        }
        default:
            return state
    }
};
