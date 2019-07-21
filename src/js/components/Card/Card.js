import React from 'react'
import './Card.scss'

// В api не нашёл время размещения объявления, при получении данных генерируется случайное время от начала года до 20 июля 

const priceSpaces = (sum = 0) => {
    sum = String(sum)
    let res = []

    for(let i = 0; i < sum.length; i += 3)
        res.push(sum.slice(-i - 3, sum.length - i))

    return res.reverse().join(' ')
}

const upperFirstSymbol = str => str.charAt(0).toUpperCase() + str.slice(1)

const dateFormat = date => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    return `${date.getDate()} ${months[date.getMonth()]} ${hours}:${minutes}`
}

const Card = ({
    product: { title, price, pictures, date },
    seller: { name, rating },
    addFavorite,
    isInFavorites
}) => {
    return (
        <div className="card">
            <div>
                <img
                    className="card__picture"
                    src={pictures[0]}
                    alt={title}
                />
            </div>

            <div className="card__description">
                <p className="card__title">{upperFirstSymbol(title)}</p>

                {isInFavorites && <span>[в избранном]</span>}
                {!isInFavorites && <span onClick={addFavorite}>[добавить в избранное]</span>}

                <p className="card__price">
                    {Number.isNaN(price) ? 'Не указана' : `${priceSpaces(price)} ₽`}
                </p>

                <p>{`(ещё ${pictures.length - 1} фото)`}</p>
                <p>{dateFormat(date)}</p>
                <p>{`Продавец: ${name}`}</p>
                <p>{`Рейтинг продавца: ${rating}`}</p>
            </div>
        </div>
    )
}

export default Card 
