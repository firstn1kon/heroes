
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError, selectFilter } from '../../actions';
import {useHttp} from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus, selectedFilter} = useSelector(state => state);
    const {request} = useHttp();

    useEffect(()=> {
        dispatch(filtersFetching())
        request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(()=> dispatch(filtersFetchingError))
        // eslint-disable-next-line
    },[])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }



    const renderFiltersBtns = (data) => {
        if (data.length === 0) {
            return
        }
        return data.map(({name, filter, clazz}) => {
          
            const active = selectedFilter === filter? {transform: 'translateY(-3px)', transition: "all .4s"} : null
            return <button 
                        key={name}
                        onClick={()=> dispatch(selectFilter(filter))} 
                        className={`btn ${clazz}`} 
                        style={active}>
                        {name}
                    </button>
        })
    }
    
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFiltersBtns(filters)}
                </div>

                </div>
            </div>
        
    )
}

export default HeroesFilters;