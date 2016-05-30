import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as Actions from '../../actions/cardActionCreators'

import Header from '../header'
import CardsList from '../cardslist'

import '../../cards.css'

const mapStateToProps = (state) => ({
  round: state.get('round'),
  cards: state.get('cards')
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


class App extends Component {
  render() {
    const {cards, round, actions} = this.props
    return (
      <div className="container">
        <Header roundCounter={round - 1} restart={actions.restart}></Header>
        <CardsList cards={cards} play={actions.play} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
