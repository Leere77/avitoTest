import React from 'react'

import './Options.scss'

const Options = ({ filter, setCategory, setPrice, setSortType, setFavFilter }) => {
    const categories = {
        'all': 'Все',
        'immovable': 'Недвидимость',
        'cameras': 'Фотоаппараты ',
        'auto': 'Автомобили',
        'laptops': 'Ноутбуки'
    }

    const priceInputHandler = e => {
        const {from, to} = filter.price
        const {name, value} = e.target
        name === 'from' ? setPrice(value, to) : setPrice(from, value)
    }

    return (
        <div className="options">
            <div className="options__categories options--margins">
                {Object.keys(categories).map(cat => (
                    <span 
                        category={cat}
                        key={cat}
                        className={`options__category ${filter.category === cat ? 'options__category--current': ''}`}
                        onClick={e => setCategory(e.target.attributes.category.value)}>
                        {categories[cat]}
                    </span>
                ))}
            </div>
            <div className="options__price options--margins">
                <span>Цена:</span>
                <br />
                <input
                    type="number"
                    name="from"
                    placeholder="От"
                    className="options__price--input"
                    onChange={priceInputHandler}
                    value={filter.price.from === 0 ? '': filter.price.from}
                />
                <input
                    type="number"
                    name="to"
                    placeholder="До"
                    onChange={priceInputHandler}
                    value={filter.price.to === Infinity || filter.price.to === 0 ? '': filter.price.to}
                />
            </div>
            
            <div className="options--margins">
                <p>Сортировать по:</p>
                <select className='options__select' onInput={e => setSortType(e.target.value)}>
                    <option value="default">популярности</option>
                    <option value="price">по возрастанию цены (от меньшей к большей)</option>
                    <option value="date">по дате размещения объявлений (от новых к старым)</option>
                </select>
            </div>

            <div className="favs">
                <label>
                    <input
                        name="favFilter"
                        type="checkbox"
                        checked={filter.favFilter}
                        onChange={() => setFavFilter(!filter.favFilter)}
                    />
                    Только избранное
                </label>
            </div>
        </div>
    )
}

export default Options
