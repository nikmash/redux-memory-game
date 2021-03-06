import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {reducer} from '../reducer'

export default function configureStore(initalState) {
  const store = createStore(reducer, initalState, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  return store
}
