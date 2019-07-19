import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from './js/reducers'

import App from './js/components/App/App'
import './css/App.scss'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <div className="mainContainer">
            <App />
        </div>
    </Provider>,
    document.querySelector('#root'),
)
