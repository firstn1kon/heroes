import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetchingError, deleteHeroe, heroesFetch, heroesSelector} from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

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

    const renderHeroesList = useCallback((arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} delHeroe={()=>delHeroe(id)}/>
        })
    },[delHeroe])

    const elements = useMemo(()=>renderHeroesList(heroes),[heroes, renderHeroesList])

    if (heroesLoadingStatus === "loading") return <Spinner/>
    if (heroesLoadingStatus === "error") return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;