
import React, { memo, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx } from '../TodoList/Todolist.styles';
import { FilterValuesType } from '../state/todolists-reducer';

type FilterTasksButtonsProps = {
    filter: FilterValuesType;
    changeFilter: (filter: FilterValuesType, todoListId: string) => void;
    todoListId: string;
};
export const FilterTasksButtons = memo(({ filter, changeFilter, todoListId }: FilterTasksButtonsProps) => {
    const changeFilterHandler = useCallback(
        (filterValue: FilterValuesType) => {
            changeFilter(filterValue, todoListId);
        },
        [changeFilter, todoListId]
    );

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterHandler('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterHandler('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterHandler('completed')}
            >
                Completed
            </Button>
        </Box>
    );
});