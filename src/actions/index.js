import { createAction } from "@reduxjs/toolkit";

export const heroesFetch = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetch = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request("http://localhost:3001/filters")
    .then(data => dispatch(filtersFetched(data)))
    .catch(()=> dispatch(filtersFetchingError))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction("HEROES_FETCHED");


export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHeroe = (id) => {
    return {
        type: 'DELETE_HEROE',
        payload: id
    }
}

export const addHeroe = (data) => {
    return {
        type: 'ADD_HEROE',
        payload: data
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (heroes) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: heroes
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const selectFilter = (filter) =>{
    return {
        type: 'SELECT_FILTER',
        payload: filter
    }
    
}