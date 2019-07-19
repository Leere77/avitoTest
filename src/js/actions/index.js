import axios from 'axios'

const setDataRequest = () => ({
    type: 'GET_DATA_REQUEST',
    isFetching: true
})

const setData = ({data: products}, {data: sellers}) => {
    products = products.map(product => (
        {
            ...product,
            price: Number(product.price),
            id: Number(product.id)
        }
    ))

    return {
        type: 'GET_DATA_SUCCESS',
        isFetching: false,
        products,
        sellers
    }
}

const setDataErr = err => ({
    type: 'GET_DATA_FAILTURE',
    isFetching: false,
    err
})

export const getData = () => async dispatch => {
    dispatch(setDataRequest())

    try {
        const [{data: products}, {data: sellers}] = await Promise.all(
            [
                axios.get('https://avito.dump.academy/products'),
                axios.get('https://avito.dump.academy/sellers')
            ]
        )

        dispatch(setData(products, sellers))
    }
    catch (err) {
        dispatch(setDataErr(err))
    }
}

export const addFavorite = id => ({
    type: 'ADD_FAVORITE',
    id
})

export const setCategory = category => ({
    type: 'SET_CATEGORY',
    category
})

export const setPrice = (from , to) => ({
    type: 'SET_PRICE',
    price: {
        from: Number(from <= 0 ? 0 : from),
        to: Number(to <= 0 ? Infinity : to)
    }
})

export const setSortType = sortType => ({
    type: 'SET_SORT_TYPE',
    sortType
})

export const setFavFilter = favFilter => ({
    type: 'SET_FAV_FILTER',
    favFilter
})