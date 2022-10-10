import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHeroe } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroesLoadingStatus} = useSelector(state => state);
    const heroes = useSelector(state => 
        state.selectedFilter === "all" ? 
            state.heroes : 
            state.heroes.filter(item => item.element === state.selectedFilter) 
    );
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);


    const delHeroe = useCallback((id)=>{
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(()=> dispatch(deleteHeroe(id)))
            .catch(() => dispatch(heroesFetchingError()))
        
    },[dispatch, request]);

    const renderHeroesList = (arr) => {
        console.log('render')
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} delHeroe={()=>delHeroe(id)}/>
        })
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    

    const elements = renderHeroesList(heroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;