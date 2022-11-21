// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { CHANGE_USER } from '../actions';
import { USER_INFO,
  PLACAR_PLAYER,
  CORRECT_ANSWERS_NUMBER, HASH_EMAIL, SAVE_RANK } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.name,
      email: action.email,
      hashEmail: action.hashEmail,
    };
  case PLACAR_PLAYER:
    return {
      ...state,
      score: action.placar,
    };
  case SAVE_RANK:
    return {
      ...state,
      rank: action.rank,
    };
  case HASH_EMAIL:
    return {
      ...state,
      imgAvatar: `https://www.gravatar.com/avatar/${action.hashEmail}`,
    };
  case CORRECT_ANSWERS_NUMBER:
    return {
      ...state,
      assertions: action.assertions,
    };
  default: {
    return state;
  }
  }
};

export default player;
