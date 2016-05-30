import {setCards, initialState, play, restart} from './core'

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_CARDS':
      return setCards(state, action.cards)
    case 'PLAY':
      return play(state, action.guess)
    case 'NEW_GAME':
      return restart(state, action.cards)
  }
}
