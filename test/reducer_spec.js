import {expect} from 'chai'

import {reducer} from '../src/reducer'
import generateCards from '../src/data'
import {Map, fromJS} from 'immutable'

describe('reducer', () => {
  it('handles SET_CARDS', () => {
    let cards = []
    for (let i = 0; i < 4; i += 2) {
      cards[i] = {
        id: i,
        twin: i+1,
        picture: i,
        flipped: false,
        match: false,
      }

      cards[i+1] = {
        id: i+1,
        twin: i,
        picture: i+1,
        flipped: false,
        match: false,
      }
    }

    const action = {type: 'SET_CARDS', cards: cards}
    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      round: 1,
      turn1: null,
      turn2: null,
      cards: [{
        id: 0,
        twin: 1,
        picture: 0,
        flipped: false,
        match: false,
      },{
        id: 1,
        twin: 0,
        picture: 1,
        flipped: false,
        match: false,
      },{
        id: 2,
        twin: 3,
        picture: 2,
        flipped: false,
        match: false,
      },{
        id: 3,
        twin: 2,
        picture: 3,
        flipped: false,
        match: false,
      }]
    }))

  })

  it('can be used with reduce', () => {
    let cards = []
    for (let i = 0; i < 4; i += 2) {
      cards[i] = {
        id: i,
        twin: i+1,
        picture: i,
        flipped: false,
        match: false,
      }

      cards[i+1] = {
        id: i+1,
        twin: i,
        picture: i+1,
        flipped: false,
        match: false,
      }
    }

    const actions = [
      {type: 'SET_CARDS', cards: cards},
      {type: 'PLAY', guess: 3},
      {type: 'PLAY', guess: 1},
      {type: 'PLAY', guess: 3},
      {type: 'PLAY', guess: 2},
      {type: 'PLAY', guess: 1},
      {type: 'PLAY', guess: 0},
    ]

    const finalState = actions.reduce(reducer, undefined)

    expect(finalState).to.equal(fromJS({
      round: 7,
      turn1: 1,
      turn2: 0,
      cards: [{
        id: 0,
        twin: 1,
        picture: 0,
        flipped: true,
        match: true,
      },{
        id: 1,
        twin: 0,
        picture: 1,
        flipped: true,
        match: true,
      },{
        id: 2,
        twin: 3,
        picture: 2,
        flipped: true,
        match: true,
      },{
        id: 3,
        twin: 2,
        picture: 3,
        flipped: true,
        match: true,
      }]
    }))
  })
})
