import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter({
    selectId: filters => filters.name
})

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    selectedFilter: "all",
})

export const filtersFetch = createAsyncThunk(
    'filters/filtersFetch',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")

    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selectFilter: (state, action) => {state.selectedFilter = action.payload}
    },
    extraReducers: builder => 
        builder
            .addCase(filtersFetch.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(filtersFetch.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                // state.filters = action.payload
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(filtersFetch.rejected, state => {state.filtersLoadingStatus = 'error'})
});


export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

const {reducer, actions} = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    selectFilter,
} = actions;
