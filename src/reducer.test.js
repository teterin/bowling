import {
  start,
  next,
  addPlayer,
  removePlayer,
  shouldSwitchPlayer,
  getNextPlayerIdx,
  __RewireAPI__ as RewireAPI,
} from './reducer';

describe('#getNextPlayerIdx', () => {
  it('should return first player', () => {
    expect(getNextPlayerIdx({
      currentPlayerIdx: 1,
      players: ['a', 'b', 'c'],
      game: [[], [], Array(20).fill(1)],
    })).to.be.eql(0);
  });
});

describe('#shouldSwitchPlayer', () => {
  describe('when game is over', () => {
    it('should return true', () => {
      RewireAPI.__Rewire__('isPlayerGameOver', () => true);
      expect(shouldSwitchPlayer([])).to.be.eql(true);
      RewireAPI.__ResetDependency__('isPlayerGameOver');
    });
  });
  describe('when it is second roll and and not last frame', () => {
    it('should return true', () => {
      RewireAPI.__Rewire__('isPlayerGameOver', () => false);
      expect(shouldSwitchPlayer([1, 1])).to.be.eql(true);
      RewireAPI.__ResetDependency__('isPlayerGameOver');
    });
  });
  describe('when it is last frame', () => {
    it('should return false', () => {
      RewireAPI.__Rewire__('isPlayerGameOver', () => false);
      expect(shouldSwitchPlayer(Array(19).fill(5))).to.be.eql(false);
      RewireAPI.__ResetDependency__('isPlayerGameOver');
    });
  });
  describe('when it is first roll', () => {
    it('should return false', () => {
      RewireAPI.__Rewire__('isPlayerGameOver', () => false);
      expect(shouldSwitchPlayer([1])).to.be.eql(false);
      RewireAPI.__ResetDependency__('isPlayerGameOver');
    });
  });
});

describe('#addPlayer', () => {
  it('should return state with new player', () => {
    const payload = 'Test';
    expect(addPlayer({ players: [] }, { payload })).to.be.eql({ players: [payload] });
  });
});

describe('#removePlayer', () => {
  it('should return state without player', () => {
    const payload = 'Test';
    expect(removePlayer({ players: [payload] }, { payload })).to.be.eql({ players: [] });
  });
});

describe('#start', () => {
  it('should return initial state for game', () => {
    const initState = { players: ['Test'] };
    expect(start(initState)).to.be.eql({ ...initState, currentPlayerIdx: 0, game: [[]] });
  });
});

describe('#next', () => {
  describe('when game is over', () => {
    it('should return the same state', () => {
      RewireAPI.__Rewire__('isGameOver', () => true);
      expect(next({}, {})).to.be.eql({});
      RewireAPI.__ResetDependency__('isGameOver');
    });
  });

  describe('when it is simple roll', () => {
    it('should return state with one more element in table', () => {
      const initState = { game: [[]], players: ['Test'], currentPlayerIdx: 0 };
      expect(next(initState, { payload: 5 })).to.be.eql({ ...initState, game: [[5]] });
    });
  });

  describe('when it is strike', () => {
    it('should return state with two more element in table', () => {
      const initState = { game: [[]], players: ['Test'], currentPlayerIdx: 0 };
      expect(next(initState, { payload: 10 })).to.be.eql({ ...initState, game: [[10, null]] });
    });
  });
  describe('when player has to be changed', () => {
    it('should return state with new currentPlayerIdx', () => {
      RewireAPI.__Rewire__('shouldSwitchPlayer', () => true);
      RewireAPI.__Rewire__('getNextPlayerIdx', () => 1);
      const initState = { game: [[]], players: ['Test'], currentPlayerIdx: 0 };
      expect(next(initState, { payload: 0 })).to.be.eql({
        ...initState,
        game: [[0]],
        currentPlayerIdx: 1,
      });
      RewireAPI.__ResetDependency__('shouldSwitchPlayer');
      RewireAPI.__ResetDependency__('getNextPlayerIdx');
    });
  });
});
