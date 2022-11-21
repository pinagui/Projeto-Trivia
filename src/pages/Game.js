import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, getToken } from '../services';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      // index: 0,

    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = getToken();
    const questions = await fetchQuestions(token);
    if (questions.length > 0) {
      this.setState({ questions });
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { questions } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <Header />
        { questions.length > 0
          && <Questions questions={ questions } history={ history } />}
      </div>

    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default Game;
