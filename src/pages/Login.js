import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, saveToken } from '../services';
import { saveUserInfo } from '../redux/actions/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const token = await fetchToken(); saveToken(token);
    history.push('/playgame');
    dispatch(saveUserInfo(name, email));
  };

  verify = () => {
    const { name, email } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const validationEmail = regexEmail.test(email);
    if (validationEmail && name.length >= 1) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  render() {
    const { history } = this.props;
    const { isDisable } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <>
        <input
          type="text"
          name="name"
          placeholder="name"
          data-testid="input-player-name"
          onChange={ handleChange }
        />

        <input
          type="text"
          name="email"
          placeholder="email"
          data-testid="input-gravatar-email"
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisable }
          onClick={ handleClick }
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
