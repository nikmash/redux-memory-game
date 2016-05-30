import {Map} from 'immutable'
import axios from 'axios'

function randomize(cards) {

  let currentIndex = cards.length, tempVal, randomIndex

  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    //Swap with current element
    tempVal = cards[currentIndex]
    cards[currentIndex] = cards[randomIndex]
    cards[randomIndex] = tempVal
  }

  return cards
}

export default () => {
  let cards = []

  const giphyEp = 'http://api.giphy.com/v1/gifs/search?q=silicon+valley&api_key=dc6zaTOxFJmzC'

  return axios.get(giphyEp, {
    params: {
      search: 'silicon valley',
      api_key: 'dc6zaTOxFJmzC',
      limit: 20,
      offset: 5,
    }
  }).then((res) => {
    for (let i = 0; i < 20; i += 2) {
      let j = Math.floor(i/2)
      cards[i] = {
        id: i,
        twin: i+1,
        picture: res.data.data[j].images.fixed_height.url,
        flipped: false,
        match: false,
      }
      cards[i+1] = {
        id: i+1,
        twin: i,
        picture: res.data.data[j].images.fixed_height.url,
        flipped: false,
        match: false,
      }
    }

    return randomize(cards)
  })

}
