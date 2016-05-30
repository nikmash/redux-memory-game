import React from 'react'
import classnames from 'classnames'

export default ({
  card,
  play
}) => {
  let imgClass = classnames({
    'hidden': !card.get('flipped')
  })
  return (
    <div className="card" onClick={() => !card.get('flipped') && play(card.get('id'))}>
      <img className={imgClass} src={card.get('picture')} />
    </div>
  )
}
