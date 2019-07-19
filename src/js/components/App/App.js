import React from 'react'
import { connect } from 'react-redux'
import { getData, addFavorite, setCategory, setPrice, setSortType, setFavFilter } from '../../actions'

import Card from '../Card/Card'
import Options from './Options'

class App extends React.Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        let { data: { isFetching, err, products, sellers } } = this.props
        const { favorites, filter } = this.props

        if(isFetching) return <h2>Loading...</h2>
        if(err) return <h2>Error occured...</h2>

        if(!products) return <h2>Nothing found...</h2>

        products = products
            .filter(product => filter.category === 'all' || product.category === filter.category)
            .filter(product => !product.price || product.price > filter.price.from && product.price < filter.price.to)
            .filter(product => {
                if(!filter.favFilter)
                    return true
                return favorites.indexOf(product.id) > -1
            })

        if(filter.sortType === 'price')
            products = products.sort((a, b) => a.price - b.price)
        else if (filter.sortType === 'date')
            products = products.sort((a, b) => b.date - a.date)

        return (
            <>
                <Options {...this.props} />
                {products.length > 0 &&
                    products
                    .map(product => (
                        <Card 
                            product={product}
                            seller={sellers[product.relationships.seller]}
                            key={product.id}
                            addFavorite={() => this.props.addFavorite(product.id)}
                            isInFavorites={favorites.indexOf(product.id) > -1}
                        />
                    )
                )}
                {products.length === 0 && <h2>По запросу ничего не найдено</h2>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
    favorites: state.favorites,
    filter: state.filter
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getData()),
    addFavorite: id => dispatch(addFavorite(id)),
    setCategory: category => dispatch(setCategory(category)),
    setPrice: (from, to) => dispatch(setPrice(from, to)),
    setSortType: sortType => dispatch(setSortType(sortType)),
    setFavFilter: filter => dispatch(setFavFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
