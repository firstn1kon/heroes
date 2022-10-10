import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHeroe } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, selectedFilter} = useSelector(state => state);
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

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        console.log('render')
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} delHeroe={()=>delHeroe(id)}/>
        })
    }

    const elements = renderHeroesList(filter(heroes, selectedFilter));
    

    function filter (data, filter) {
        switch(filter) {
            default: 
                return data;
            case "all": 
                return data;
            case "fire": 
                return data.filter(item => item.element === "fire");
            case "water": 
                return data.filter(item => item.element === "water");
            case "wind": 
                return data.filter(item => item.element === "wind");
            case "earth": 
                return data.filter(item => item.element === "earth");
        }
    }
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;