import generateCards from '../data'

export function play(id) {
  return {
    type: 'PLAY',
    guess: id
  }
}

export function restart() {
  return function(dispatch) {
    return generateCards().then((res) => {
      dispatch({type: 'NEW_GAME', 'cards': res})
    })
  }
}
