import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const qtdAssertions = 3;
    return (
      <>
        <Header />
        <div>
          { assertions < qtdAssertions ? (
            <p data-testid="feedback-text">Could be better...</p>)
            : <p data-testid="feedback-text">Well Done!</p> }
          <span data-testid="feedback-total-score">{score}</span>
          <span data-testid="feedback-total-question">{assertions}</span>
          <div>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              Play Again
            </button>
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imgAvatar: PropTypes.string.isRequired,
}.isRequired;

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  name: globalState.player.name,
  imgAvatar: globalState.player.imgAvatar,
});

export default connect(mapStateToProps)(Feedback);
