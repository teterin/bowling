export const FRAME_NUMBERS = 10;
export const LAST_FRAME_IDX = FRAME_NUMBERS - 1;
export const MAX_SCORE = 10;
export const FRAME_ROLL_NUMBER = 2;
const MAX_ROLL_NUMBER = FRAME_ROLL_NUMBER * FRAME_NUMBERS + 1;

function getIdx(frameIdx, rollIdx) {
  return frameIdx * FRAME_ROLL_NUMBER + rollIdx;
}

export function isStrike(table, frameIdx) {
  const firstRollIdx = getIdx(frameIdx, 0);
  return table[firstRollIdx] === MAX_SCORE;
}

export function isSpare(table, frameIdx) {
  const firstRollIdx = getIdx(frameIdx, 0);
  const secondRollIdx = getIdx(frameIdx, 1);
  return table[firstRollIdx] + table[secondRollIdx] === MAX_SCORE;
}

export function getCurrentFrameIdx(table) {
  const { length } = table;
  if (length <= (FRAME_NUMBERS - 1) * FRAME_ROLL_NUMBER) {
    return Math.floor(length / FRAME_ROLL_NUMBER);
  }
  return LAST_FRAME_IDX;
}

export function getCurrentScoreLimit(table) {
  const { length } = table;
  if (
    getCurrentFrameIdx(table) === LAST_FRAME_IDX &&
    (isStrike(table, LAST_FRAME_IDX) || isSpare(table, LAST_FRAME_IDX))
  ) {
    return MAX_SCORE;
  }
  if (length % FRAME_ROLL_NUMBER === 0) {
    return MAX_SCORE;
  }
  return MAX_SCORE - table[length - 1];
}

export function getCurrentRoll(table) {
  const { length } = table;
  return length % FRAME_ROLL_NUMBER + 1;
}

export function isPlayerGameOver(table) {
  const { length } = table;
  if (length < FRAME_NUMBERS * FRAME_ROLL_NUMBER) {
    return false;
  }
  if (
    (isStrike(table, LAST_FRAME_IDX) || isSpare(table, LAST_FRAME_IDX)) &&
    length < MAX_ROLL_NUMBER
  ) {
    return false;
  }

  return true;
}

export function isGameOver(game) {
  return !game.some(table => !isPlayerGameOver(table));
}

function getSumNextRolls(table, startIdx, count) {
  const { length } = table;
  let c = count;
  let sum = 0;
  for (let i = startIdx; i < length && c > 0; i += 1) {
    if (table[i] !== null) {
      sum += table[i];
      c -= 1;
    }
  }
  return sum;
}

export function getTotal(table) {
  const { length } = table;
  let total = 0;
  for (let i = 0; i < length && i <= getIdx(LAST_FRAME_IDX, 0); i += FRAME_ROLL_NUMBER) {
    const frameIdx = Math.floor(i / FRAME_ROLL_NUMBER);
    if (isStrike(table, frameIdx)) {
      const nextIdx = frameIdx === LAST_FRAME_IDX ? i + 1 : getIdx(frameIdx + 1, 0);
      total += 10 + getSumNextRolls(table, nextIdx, 2);
    } else if (isSpare(table, frameIdx)) {
      const nextIdx = frameIdx === LAST_FRAME_IDX ? i + 2 : getIdx(frameIdx + 1, 0);
      total += 10 + getSumNextRolls(table, nextIdx, 1);
    } else {
      total += table[i] + (i <= length - 2 ? table[i + 1] : 0);
    }
  }
  return total;
}
