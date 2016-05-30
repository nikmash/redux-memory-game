import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import './normalize.css'
import generateCards from './data'
import App from './components/app'

import configureStore from './store'


let cards = generateCards()

cards.then((cards) => {
  const store = configureStore()
  store.dispatch({
    type: 'SET_CARDS',
    cards: cards,
  })

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )

})
