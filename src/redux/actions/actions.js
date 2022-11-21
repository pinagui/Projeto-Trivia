export const USER_INFO = 'USER_INFO';
export const PLACAR_PLAYER = 'PLACAR_PLAYER';
export const CORRECT_ANSWERS_NUMBER = 'CORRECT_ANSWERS_NUMBER';
export const HASH_EMAIL = 'HASH_EMAIL';
export const SAVE_RANK = 'SAVE_RANK';

export const saveUserInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const saveHashEmail = (hashEmail) => ({
  type: HASH_EMAIL,
  hashEmail,
});

export const savePlacarPlayer = (placar) => ({
  type: PLACAR_PLAYER,
  placar,
});

export const saveRankOnState = (rank) => ({
  type: SAVE_RANK,
  rank,
});

export const correctAnswersNumber = (number) => ({
  type: CORRECT_ANSWERS_NUMBER,
  assertions: number,
});
