import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {selectFilter, filtersFetch, selectAll} from './filtersSlice'
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {filtersLoadingStatus, selectedFilter} = useSelector(state => state.filters);
    const filters = useSelector(selectAll)

    useEffect(()=> {
        dispatch(filtersFetch())
        // eslint-disable-next-line
    },[])

    if (filtersLoadingStatus === "loading") return <Spinner/>
    if (filtersLoadingStatus === "error") return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    
    const renderFiltersBtns = (data) => {
        if (data.length === 0) {
            return
        }
        return data.map(({name, filter, clazz}) => {
            const active = selectedFilter === filter? 
                {transform: 'translateY(-3px)', transition: "all .4s"} : 
                null
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