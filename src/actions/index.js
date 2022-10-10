export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

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

export const selectFilter = (filter) => {
    return {
        type: 'SELECT_FILTER',
        payload: filter
    }
}