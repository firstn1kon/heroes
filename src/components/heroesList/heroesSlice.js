import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const heroesFetch = createAsyncThunk(
    'heroes/heroesFetch',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error'
        },
        deleteHeroe: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            heroesAdapter.removeOne(state, action.payload)
        },
        addHeroe: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            heroesAdapter.addOne(state, action.payload);
            
        },
    },
    extraReducers: builder => 
        builder
            .addCase(heroesFetch.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(heroesFetch.fulfilled, (state, action)=> {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(heroesFetch.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(()=> {})
})

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const heroesSelector = createSelector(
    (state) => state.filters.selectedFilter,
    selectAll,
    (filter, heroes) => filter === "all" ? 
    heroes : 
    heroes.filter(item => item.element === filter) 
)

const {actions, reducer} = heroesSlice;

export default reducer;

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHeroe,
    addHeroe,
} = actions;