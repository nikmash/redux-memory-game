import React from 'react'

export default({
  roundCounter,
  restart
}) => (
  <header>
    <label>Turns Played: {roundCounter}</label>
    <button onClick={() => restart()} disabled={roundCounter === 1}>Restart</button>
  </header>
)
