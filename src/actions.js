import { ActionType, createActionTypes } from 'action-types';
import { createAction } from 'redux-actions';

const actionTypes = createActionTypes({
  START: ActionType,
  NEXT: ActionType,
});

export const start = createAction(actionTypes.START);
export const next = createAction(actionTypes.NEXT);

export default actionTypes;
