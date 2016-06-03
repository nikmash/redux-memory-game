import {List, Map, fromJS} from 'immutable'
import generateCards from './data'

export const initialState = Map({
  round: 1,
  turn1: null,
  turn2: null,
})

export function setCards(state, cards) {
  return state.set('cards', fromJS(cards))
}

export function play (state, turn) {
  if (state.get('round') % 2 === 1){
    let turn1 = state.get('turn1')
    let turn2 = state.get('turn2')

    if (turn1 && turn2) {
      if (state.getIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn1, 'match'])) === true) {
        return state.update('round', round => round + 1)
                    .set('turn1', turn)
                    .set('turn2', null)
                    .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'flipped']), true)
      }
      return state.update('round', round => round + 1)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn1, 'flipped']), false)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn2, 'flipped']), false)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'flipped']), true)
                  .set('turn1', turn)
                  .set('turn2', null)

    }

    return state.update('round', round => round + 1)
                .set('turn1', turn)
                .set('turn2', null)
                .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'flipped']), true)

  } else {
    let turn1 = state.get('turn1')

    if (state.getIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn1, 'twin'])) === turn) {
      return state.update('round', round => round + 1)
                  .set('turn2', turn)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn1, 'match']), true)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'match']), true)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'flipped']), true)

    } else {
      return state.update('round', round => round + 1)
                  .set('turn2', turn)
                  .setIn(constructKeyPath(state, ['cards', (card) => card.get('id') === turn, 'flipped']), true)
    }

  }
}

export function restart(state, cards) {
  return state.set('round', 1)
              .set('cards', fromJS(cards))
              .set('turn1', null)
              .set('turn2', null)
}

function constructKeyPath(context, keyPath) {
  let kp = []

  keyPath.forEach((key) => {
    if (typeof key !== 'function') kp.push(key)
    else {
      kp.push(context.getIn(kp).findIndex(key))
    }
  })

  return kp
}
