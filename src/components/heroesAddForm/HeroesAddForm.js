
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { heroesFetching, heroesFetchingError, addHeroe } from '../../actions';
import {useHttp} from '../../hooks/http.hook';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [element, setElement] = useState();

    const inValueInput = (e) => {
        const target = e.target;
        switch (target.name){
            case 'name':
                return setName(target.value)
            case 'text':
                return setText(target.value)
            case 'element':
                return setElement(target.value)
            default: return
        }
    }

    const addHeroOn = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4() ,
            name: name,
            description: text,
            element: element,
        }
        const json = JSON.stringify(newHero);
        
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes/", 'POST', json)
            .then(()=> dispatch(addHeroe(newHero)))
            .catch(() => dispatch(heroesFetchingError()))
            .finally(()=> {
                setName("");
                setText("");
                setElement("")
            })


        
    }

    const renderOptionsFilter = (data) => 
        data.map(({name, filter}) => 
        filter === "all"? null: <option key ={filter} value={filter}>{name}</option>)

    

    const options = renderOptionsFilter(filters)

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e)=>addHeroOn(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    value={name} 
                    onChange={(e)=>inValueInput(e)}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={text}
                    onChange={(e)=>inValueInput(e)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    value={element}
                    onChange={(e)=>inValueInput(e)}
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