import React from 'react'
import './Card.scss'

const priceSpaces = sum => {
    sum = String(sum)
    let res = []

    for(let i = 0; i < sum.length; i += 3)
        res.push(sum.slice(-i - 3, sum.length - i))

    return res.reverse().join(' ')
}

const dateFormat = date => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    return `${date.getDate()} ${months[date.getMonth()]} ${hours}:${minutes}`
}

const Card = ({product, seller, addFavorite, isInFavorites}) => {
    return (
        <div className="card">
            <div>
                <img
                    className="card__picture"
                    src={product.pictures[0]}
                    alt={product.title}
                />
            </div>

            <div className="card__description">
                <p className="card__title">{product.title.charAt(0).toUpperCase().concat(product.title.slice(1))}</p>

                {isInFavorites && <span>[в избранном]</span>}
                {!isInFavorites && <span onClick={addFavorite}>[в избранное]</span>}

                <p className="card__price">
                    {Number.isNaN(product.price) ? 'Не указана' : `${priceSpaces(product.price)} ₽`}
                </p>

                <p>{`(ещё ${product.pictures.length - 1} фото)`}</p>
                <p>{dateFormat(product.date)}</p>
                <p>{`Продавец: ${seller.name}`}</p>
                <p>{`Рейтинг продавца: ${seller.rating}`}</p>
            </div>
        </div>
    )
}

export default Card 
