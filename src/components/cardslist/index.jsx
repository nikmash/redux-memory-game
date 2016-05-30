import React from 'react'
import {connect, dispatch} from 'react-redux'
import Card from '../card'

export default({
  cards,
  play
}) => (
  <section className="cards">
    {
      cards.map(card =>
        <Card key={card.get('id')} card={card} play={play} />
      )
    }
  </section>
)
