import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.saveRankLC();
  }

  saveRankLC = () => {
    const ranking = localStorage.getItem('ranking');
    const { name, score, imgAvatar } = this.props;
    const result = { name, score, imgAvatar };

    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify(result));
      this.setState({
        ranking: result,
      });
    } else {
      console.log('oi');
      const a = JSON.parse(ranking);
      console.log(a);
      // const c = `${ranking},${result}`;
      // const d = JSON.parse(c);
      // console.log(d);
      // const newRank = d.sort((a, b) => b.score - a.score);
      // localStorage.setItem('ranking', JSON.stringify(newRank));
      // this.setState({
      //   ranking: newRank,
      // });
    }
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <div>
          <span data-testid="ranking-title">Ranking</span>
        </div>
        <div>
          {ranking.map((person, i) => (
            <div key={ i }>
              <p data-testid={ `player-name-${i}` }>{ person.name }</p>
              <p data-testid={ `player-score-${i}` }>{ person.score }</p>
              <img src={ person.imgAvatar } alt="avatar profile" />
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
        <div />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgAvatar: PropTypes.string.isRequired,
}.isRequired;

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  name: globalState.player.name,
  imgAvatar: globalState.player.imgAvatar,
});

export default connect(mapStateToProps)(Ranking);
