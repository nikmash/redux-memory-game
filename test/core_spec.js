import {expect} from 'chai'
import {Map, List, fromJS} from 'immutable'
import {setCards, play} from '../src/core'

describe('application logic', () => {

  describe('setCards', () => {
    it('converts to immutable', () => {
      const state = Map({
        round: 1,
        turn1: null,
        turn2: null,
      })

      let cards = []

      for (let i = 0; i < 4; i+=2) {
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

      const nextState = setCards(state, cards)

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
  })

  describe('play', () => {
    it('starts the game', () => {
      const state = fromJS({
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
      })

      const nextState = play(state, 3)

      expect(nextState).to.equal(fromJS({
        round: 2,
        turn1: 3,
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
          flipped: true,
          match: false,
        }]
      }))
    })

    it('plays the wrong move', () => {
      const state = fromJS({
        round: 2,
        turn1: 3,
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
          flipped: true,
          match: false,
        }]
      })

      const nextState = play(state, 1)

      expect(nextState).to.equal(fromJS({
        round: 3,
        turn1: 3,
        turn2: 1,
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
          flipped: true,
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
          flipped: true,
          match: false,
        }]
      }))
    })

    it('plays a move', () => {
      const state = fromJS({
        round: 3,
        turn1: 3,
        turn2: 1,
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
          flipped: true,
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
          flipped: true,
          match: false,
        }]
      })

      const nextState = play(state, 3)

      expect(nextState).to.equal(fromJS({
        round: 4,
        turn1: 3,
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
          flipped: true,
          match: false,
        }]
      }))
    })

    it('plays the right move to create a match', () => {
      const state = fromJS({
        round: 4,
        turn1: 3,
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
          flipped: true,
          match: false,
        }]
      })

      const nextState = play(state, 2)

      expect(nextState).to.equal(fromJS({
        round: 5,
        turn1: 3,
        turn2: 2,
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

    it('should play a move', () => {
      const state = fromJS({
        round: 5,
        turn1: 3,
        turn2: 2,
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
          flipped: true,
          match: true,
        },{
          id: 3,
          twin: 2,
          picture: 3,
          flipped: true,
          match: true,
        }]
      })

      const nextState = play(state, 1)

      expect(nextState).to.equal(fromJS({
        round: 6,
        turn1: 1,
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
          flipped: true,
          match: false,
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

    it('should play a game winning move', () => {
      const state = fromJS({
        round: 6,
        turn1: 1,
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
          flipped: true,
          match: false,
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
      })

      const nextState = play(state, 0)

      expect(nextState).to.equal(fromJS({
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


})
