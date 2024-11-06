

export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME': {
            return {
                ...state,
                themeMode: action.mode,
            };
        }
        default:
            return state
    }
}

export const changeThemeAC = (mode: ThemeMode): ChangeThemeActionType => ({
    type: 'CHANGE_THEME',
    mode,
});

type ChangeThemeActionType = {
    type: 'CHANGE_THEME';
    mode: ThemeMode;
};

type ActionsType = ChangeThemeActionType
