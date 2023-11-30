import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { heroesFetching, heroesFetchingError, addHeroe} from '../heroesList/heroesSlice';
import {selectAll} from '../heroesFilters/filtersSlice'
import {useHttp} from '../../hooks/http.hook';

const initForm = {
    name: "",
    description: "",
    element: "",
}

const HeroesAddForm = () => {

    const filters = useSelector(selectAll)
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [values, setValue] = useState(initForm)

    const addHeroOn = (e) => {
        e.preventDefault();
        const newHero = {...values, id: uuidv4()}
        const json = JSON.stringify(newHero);
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes/", 'POST', json)
            .then(()=> dispatch(addHeroe(newHero)))
            .catch(() => dispatch(heroesFetchingError()))
            .finally(()=> {setValue(initForm)})
    }

    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        setValue(values => ({...values, [field]: value}))
    }

    const renderOptionsFilter = (data) => 
        data.map(({name, filter}) => 
        filter === "all"? null: <option key ={filter} value={filter}>{name}</option>)

    const options = useMemo(() => renderOptionsFilter(filters),[filters])

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e)=>addHeroOn(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    value={values.name} 
                    onChange={onChange}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    value={values.description}
                    onChange={onChange}
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    value={values.element}
                    onChange={onChange}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option>Я владею элементом...</option>
                    {options}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;