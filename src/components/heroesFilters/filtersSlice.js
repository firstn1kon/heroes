import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    selectedFilter: "all",
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload
        },
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        selectFilter: (state, action) => {state.selectedFilter = action.payload}
    }
});

const {reducer, actions} = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    selectFilter,
} = actions;