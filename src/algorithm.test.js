import {
  isStrike,
  isSpare,
  getCurrentFrameIdx,
  getCurrentScoreLimit,
  isPlayerGameOver,
  getTotal,
} from './algorithm';
import { getArray } from './utils';

describe('algorithm functions', () => {
  describe('#isStrike', () => {
    describe('when it is strike', () => {
      it('should return true', () => {
        expect(isStrike([10, null], 0)).to.equal(true);
      });
    });

    describe('when it is not strike', () => {
      it('should return false', () => {
        expect(isStrike([5, 5], 0)).to.be.equal(false);
      });
    });
  });

  describe('#isSpare', () => {
    describe('when it is spare', () => {
      it('should return true', () => {
        expect(isSpare([3, 7], 0)).to.be.equal(true);
      });
    });

    describe('when it is not spare', () => {
      it('should return false', () => {
        expect(isSpare([4, 5], 0)).to.be.equal(false);
      });
    });
  });

  describe('#getCurrentFrameIdx', () => {
    describe('when it is in a middle', () => {
      it('should return 1', () => {
        expect(getCurrentFrameIdx([1, 1, 1])).to.equal(1);
      });
    });

    describe('when it is the last one', () => {
      it('should return 9', () => {
        expect(getCurrentFrameIdx(getArray(21))).to.equal(9);
      });
    });
  });

  describe('#getCurrentScoreLimit', () => {
    describe('when it is in a middle', () => {
      describe('when it is first roll', () => {
        it('should return 10', () => {
          expect(getCurrentScoreLimit([])).to.equal(10);
        });
      });

      describe('when it is second roll', () => {
        it('should return 10 - <score from first roll>', () => {
          expect(getCurrentScoreLimit([5])).to.equal(5);
        });
      });

      describe('when it is last frame with strike', () => {
        it('should return 10', () => {
          const table = getArray(18);
          table.push(10);
          expect(getCurrentScoreLimit(table)).to.equal(10);
        });
      });

      describe('when it is last frame with spare', () => {
        it('should return 10', () => {
          const table = getArray(18);
          table.push(5);
          table.push(5);
          expect(getCurrentScoreLimit(table)).to.equal(10);
        });
      });
    });
  });

  describe('#isPlayerGameOver', () => {
    describe('when it is simple case', () => {
      describe('when all frames is completed', () => {
        it('should return true', () => {
          expect(isPlayerGameOver(getArray(20))).to.equal(true);
        });
      });

      describe('when it is not all frames are done', () => {
        it('should return false', () => {
          expect(isPlayerGameOver(getArray(18))).to.equal(false);
        });
      });
    });
    describe('when last frame has strike or spare', () => {
      it('should return false', () => {
        const table = getArray(18);
        table.push(5);
        table.push(5);
        expect(isPlayerGameOver(table)).to.equal(false);
      });
      it('should return false', () => {
        const table = getArray(18);
        table.push(10);
        expect(isPlayerGameOver(table)).to.equal(false);
      });
      it('should return false', () => {
        const table = getArray(18);
        table.push(10);
        table.push(10);
        expect(isPlayerGameOver(table)).to.equal(false);
      });
      it('should return false', () => {
        const table = getArray(18);
        table.push(10);
        table.push(10);
        table.push(10);
        expect(isPlayerGameOver(table)).to.equal(true);
      });
    });
  });

  describe('#getTotal', () => {
    describe('when there is no strike or spare', () => {
      it('should return 20', () => {
        const table = Array(20).fill(1);
        expect(getTotal(table)).to.equal(20);
      });
    });
    describe('when there first frame is a spare', () => {
      it('should return 29', () => {
        const table = Array(20).fill(1);
        table[1] = 9;
        expect(getTotal(table)).to.equal(29);
      });
    });
    describe('when there first frame is a strike', () => {
      it('should return 30', () => {
        const table = Array(20).fill(1);
        table[0] = 10;
        table[1] = null;
        expect(getTotal(table)).to.equal(30);
      });
    });
    describe('when it is all strike', () => {
      it('should return 300', () => {
        const table = Array(21).fill(10);
        table[1] = null;
        table[3] = null;
        table[5] = null;
        table[7] = null;
        table[9] = null;
        table[11] = null;
        table[13] = null;
        table[15] = null;
        table[17] = null;
        expect(getTotal(table)).to.equal(300);
      });
    });
    describe('when it is all spare', () => {
      it('should return 150', () => {
        const table = Array(21).fill(5);
        expect(getTotal(table)).to.equal(150);
      });
    });
  });
});
