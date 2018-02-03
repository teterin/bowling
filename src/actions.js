import { ActionType, createActionTypes } from 'action-types';
import { createAction } from 'redux-actions';

const actionTypes = createActionTypes({
  START: ActionType,
  NEXT: ActionType,
  ADD_PLAYER: ActionType,
  REMOVE_PLAYER: ActionType,
});

export const start = createAction(actionTypes.START);
export const next = createAction(actionTypes.NEXT);
export const addPlayer = createAction(actionTypes.ADD_PLAYER);
export const removePlayer = createAction(actionTypes.REMOVE_PLAYER);

export default actionTypes;
