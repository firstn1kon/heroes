const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HEROE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesLoadingStatus: 'idle',
            }
        case 'ADD_HEROE':
            return {
                ...state,
                heroes: [action.payload, ...state.heroes],
                heroesLoadingStatus: 'idle',
            }
        default: return state
    }
}

export default heroes;