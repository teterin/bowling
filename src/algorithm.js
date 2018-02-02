export const FRAME_NUMBERS = 10;
export const LAST_FRAME_IDX = FRAME_NUMBERS - 1;
export const MAX_SCORE = 10;
const MAX_ROLL_NUMBER = 2 * FRAME_NUMBERS + 1;

function getIdx(frameIdx, rollIdx) {
  return frameIdx * 2 + rollIdx;
}

function isStrike(game, frameIdx) {
  const firstRollIdx = getIdx(frameIdx, 0);
  return game[firstRollIdx] === MAX_SCORE;
}

function isSpare(game, frameIdx) {
  const firstRollIdx = getIdx(frameIdx, 0);
  const secondRollIdx = getIdx(frameIdx, 1);
  return game[firstRollIdx] + game[secondRollIdx] === MAX_SCORE;
}

export function getCurrentFrameIdx({ game }) {
  const { length } = game;
  if (length <= (FRAME_NUMBERS - 1) * 2) {
    return Math.floor(length / 2);
  }
  return LAST_FRAME_IDX;
}

export function getCurrentScoreLimit(state) {
  const { game } = state;
  const { length } = game;
  if (
    getCurrentFrameIdx(state) === LAST_FRAME_IDX &&
    (isStrike(game, LAST_FRAME_IDX) || isSpare(game, LAST_FRAME_IDX))
  ) {
    return MAX_SCORE;
  }
  if (length % 2 === 0) {
    return MAX_SCORE;
  }
  return MAX_SCORE - game[length - 1];
}

export function getCurrentRoll({ game }) {
  const { length } = game;
  return length % 2 === 0 ? 1 : 2;
}

export function isGameOver(state) {
  const { game } = state;
  if (game.length < FRAME_NUMBERS * 2) {
    return false;
  }
  if (
    (isStrike(game, LAST_FRAME_IDX) || isSpare(game, LAST_FRAME_IDX)) &&
    game.length < MAX_ROLL_NUMBER
  ) {
    return false;
  }

  return true;
}

function getSumNextRolls(game, startIdx, count) {
  const { length } = game;
  let sum = 0;
  for (let i = startIdx; i < length && count > 0; i++) {
    if (game[i] !== null) {
      sum += game[i];
      count--;
    }
  }
  return sum;
}

export function getTotal({ game }) {
  const { length } = game;
  let total = 0;
  for (let i = 0; i < length; i += 2) {
    const frame = Math.floor(i / 2);
    if (isStrike(game, frame)) {
      total += 10 + getSumNextRolls(game, i + 1, 2);
    } else if (isSpare(game, frame)) {
      total += 10 + getSumNextRolls(game, i + 1, 1);
    } else {
      total += game[i] + (i <= length - 2 ? game[i + 1] : 0);
    }
  }
  return total;
}
