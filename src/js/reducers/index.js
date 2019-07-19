const data = (state = {isFetching: false}, action) => {
    const {isFetching} = action
    switch(action.type) {
        case 'GET_DATA_REQUEST':
            return { isFetching }
        case 'GET_DATA_SUCCESS':
            return {
                isFetching,
                products: action.products,
                sellers: action.sellers
            }
        case 'GET_DATA_FAILTURE':
            return {
                isFetching,
                err: action.err
            }
        default: 
            return state
    }
}

let initialFavState = localStorage.getItem('favs')

if(initialFavState)
    initialFavState = localStorage.getItem('favs').split(',').map(item => Number(item))
else 
    initialFavState = []

const favorites = (state = initialFavState, action) => {
    switch(action.type) {
        case 'ADD_FAVORITE': {
            localStorage.setItem('favs', [...state, Number(action.id)]);
            return [...state, Number(action.id)]
        }
        default:
            return state
    }
}

const initialFilterState = {
    category: 'all',
    price: {
        from: 0,
        to: Infinity
    },
    sortType: 'default',
    favFilter: false
} 

const filter = (state = initialFilterState, action) => {
    switch(action.type) {
        case 'SET_CATEGORY':
            return {...state, category: action.category}
        case 'SET_PRICE':
            return {...state, price: action.price}
        case 'SET_SORT_TYPE':
            return {...state, sortType: action.sortType}
        case 'SET_FAV_FILTER':
            return {...state, favFilter: action.favFilter}
        default: 
            return state
    }
}

const reducer = (state = {}, action) => ({
    data: data(state.data, action),
    favorites: favorites(state.favorites, action),
    filter: filter(state.filter, action)
})

export default reducer