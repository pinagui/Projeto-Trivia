import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { correctAnswersNumber, savePlacarPlayer } from '../redux/actions/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsList: [],
      correctStyle: { border: '' },
      incorrectStyle: { border: '' },
      timer: 30,
      isDisable: false,
      placar: 0,
      indexQuestions: 0,
      nextButton: false,
      correctAnswers: 0,
    };
  }

  componentDidMount() {
    this.createList();
    this.timer();
  }

  // componentDidUpdate() {
  //   const { timer } = this.state;
  //   // console.log(timer);
  //   if (timer === 1) {
  //     console.log('acabou o tempo');
  //     // this.setState({ nextButton: true });
  //   }
  // }

  createList = () => {
    const { indexQuestions } = this.state;
    const { questions } = this.props;
    const {
      incorrect_answers: incorrect, correct_answer: correct } = questions[indexQuestions];
    const answers = incorrect.map((item, index) => ({
      alternative: item,
      index,
      correct: false,
    }));
    const correta = {
      alternative: correct,
      correct: true,
    };
    answers.push(correta);

    const questionsList = this.shuffleArray(answers);
    this.setState({ questionsList });
  };

  // Função para ramdomizar array fonte: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  handleClick = async ({ target }) => {
    const { indexQuestions } = this.state;
    const { questions } = this.props;
    console.log();
    this.setState({
      correctStyle: { border: '3px solid rgb(6, 240, 15)' },
      incorrectStyle: { border: '3px solid red' },
      nextButton: true,
    });

    const difficultyQuestion = questions[indexQuestions].difficulty;

    switch (difficultyQuestion) {
    case 'easy':
      return this.setState(
        { difficulty: 1 },
        () => this.changePlacar(target.dataset.testid),
      );
    case 'medium':
      return this.setState(
        { difficulty: 2 },
        () => this.changePlacar(target.dataset.testid),
      );
    case 'hard':
      return this.setState(
        { difficulty: 3 },
        () => this.changePlacar(target.dataset.testid),
      );
    default:
      return 'error';
    }
  };

  handleNext = async () => {
    const { indexQuestions, correctAnswers } = this.state;
    const { history, dispatch } = this.props;
    const maxIndex = 4;
    await this.setState({
      nextButton: false,
      correctStyle: { border: '' },
      incorrectStyle: { border: '' },
      // timer: 30,
      isDisable: false,
    });
    if (indexQuestions < maxIndex) {
      this.setState((prev) => ({ indexQuestions: prev.indexQuestions + 1 }));
    }
    console.log(indexQuestions);
    if (indexQuestions === maxIndex) {
      history.push('/feedback');
      dispatch(correctAnswersNumber(correctAnswers));
    } else {
      this.createList();
    }
  };

  changePlacar = (btnTarget) => {
    const { difficulty, timer, placar } = this.state;
    const TEN = 10;
    if (btnTarget === 'correct-answer') {
      this.setState((prev) => ({
        placar: placar + (TEN + (timer * difficulty)),
        correctAnswers: prev.correctAnswers + 1,
      }), () => this.savePlacarRedux());
    } else {
      this.setState((prev) => ({
        placar: prev.placar,
      }), () => this.savePlacarRedux());
    }
  };

  savePlacarRedux = () => {
    const { placar } = this.state;
    const { dispatch } = this.props;
    dispatch(savePlacarPlayer(placar));
  };

  timer = async () => {
    const ONE_SECOND = 1000;
    const THIRTY_SECONDS = 30000;
    // const { timer } = this.state;
    const timerID = setInterval(() => this.setState((prev) => ({
      timer: prev.timer - 1,
    })), ONE_SECOND);

    setTimeout(() => {
      clearInterval(timerID);
      this.setState({ timer: 30, isDisable: true, nextButton: true });
    }, THIRTY_SECONDS);
  };

  render() {
    const { questions } = this.props;
    const { questionsList,
      correctStyle,
      incorrectStyle, timer, isDisable, indexQuestions, nextButton } = this.state;
    const { category, question } = questions[indexQuestions];

    return (
      <main>
        {questions.length > 0 && (
          <>
            <div>
              <h2 data-testid="question-category">{ category }</h2>
              <p data-testid="question-text">{ question }</p>
              <span>{ timer }</span>
            </div>
            <div data-testid="answer-options">
              {
                questionsList.map((answer, index) => (answer.correct ? (
                  <button
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    style={ correctStyle }
                    onClick={ this.handleClick }
                    disabled={ isDisable }
                  >
                    {answer.alternative}

                  </button>
                ) : (
                  <button
                    key={ index }
                    type="button"
                    style={ incorrectStyle }
                    data-testid={ `wrong-answer-${answer.index}` }
                    onClick={ this.handleClick }
                    disabled={ isDisable }
                  >
                    {answer.alternative}

                  </button>
                )))
              }
              <div>
                {nextButton && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                    // disabled={ isDisable }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

    );
  }
}
Questions.propTypes = {
  questions: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default connect()(Questions);
