import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHeroe,
    addHeroe,
} from "../actions"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, action)=> {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(deleteHeroe, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addCase(addHeroe, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes.push(action.payload);
        })
        .addDefaultCase(()=>{})
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'DELETE_HEROE':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//                 heroesLoadingStatus: 'idle',
//             }
//         case 'ADD_HEROE':
//             return {
//                 ...state,
//                 heroes: [action.payload, ...state.heroes],
//                 heroesLoadingStatus: 'idle',
//             }
//         default: return state
//     }
// }

export default heroes;