import React from 'react'
import './Card.scss'

const priceSpaces = sum => {
    sum = String(sum)
    let res = []

    for(let i = 0; i < sum.length; i += 3)
        res.push(sum.slice(-i - 3, sum.length - i))

    return res.reverse().join(' ')
}

const Card = ({product, seller, addFavorite, isInFavorites}) => {
    return (
        <div className="card">
            <div>
                <img
                    className="card__picture"
                    src={product.pictures[0].slice(2)}
                    alt={product.title}
                />
            </div>

            <div className="card__descriptionSection">
                <p className="card__title">{product.title.charAt(0).toUpperCase().concat(product.title.slice(1))}</p>

                {isInFavorites && <span>[в избранном]</span>}
                {!isInFavorites && <span onClick={addFavorite}>[в избранное]</span>}

                <p className="card__price">
                    {Number.isNaN(product.price) ? 'Не указана' : `${priceSpaces(product.price)} ₽`}
                </p>

                <p>{`(ещё ${product.pictures.length - 1} фото)`}</p>
                <p>{`Продавец: ${seller.name}`}</p>
                <p>{`Рейтинг продавца: ${seller.rating}`}</p>
            </div>
        </div>
    )
}

export default Card 
