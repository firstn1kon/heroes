import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetchingError, deleteHeroe, heroesFetch} from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const heroesSelector = createSelector(
        (state) => state.filters.selectedFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => filter === "all" ? 
        heroes : 
        heroes.filter(item => item.element === filter) 
    )

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const heroes = useSelector(heroesSelector);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetch());


        // eslint-disable-next-line
    }, []);

    const delHeroe = useCallback((id)=>{
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(()=> dispatch(deleteHeroe(id)))
            .catch(() => dispatch(heroesFetchingError()))
        
    },[request, dispatch]);

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} delHeroe={()=>delHeroe(id)}/>
        })
    }

    const elements = renderHeroesList(heroes);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;