import {RootState} from "../state/store";
import {ThemeMode} from "../state/app-reducer";
export const selectThemeMode = (state: RootState): ThemeMode => state.theme?.themeMode
