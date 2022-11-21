import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import store from '../redux/store';
import { saveHashEmail } from '../redux/actions/actions';

class Header extends Component {
  render() {
    console.log(store.getState().player.email);
    const { name, email, score, dispatch } = this.props;
    const hashEmail = md5(email).toString();
    dispatch(saveHashEmail(hashEmail));
    return (
      <div className="App">
        <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="avatar profile" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p data-testid="header-score">{ score }</p>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
