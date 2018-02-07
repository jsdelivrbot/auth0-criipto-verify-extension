import { fromJS } from 'immutable';

import * as constants from '../../constants';
import createReducer from '../utils/createReducer';

const initialState = {
  loading: false,
  creating: false,
  error: null,
  records: null
};

export const connections = createReducer(fromJS(initialState), { // eslint-disable-line import/prefer-default-export
  [constants.FETCH_CONNECTIONS_PENDING]: (state) =>
    state.merge({
      loading: true,
      error: null
    }),
  [constants.FETCH_CONNECTIONS_REJECTED]: (state, action) =>
    state.merge({
      loading: false,
      error: `An error occured while loading the connections: ${action.errorMessage}`
    }),
  [constants.FETCH_CONNECTIONS_FULFILLED]: (state, action) =>
    state.merge({
      loading: false,
      error: null,
      records: fromJS(action.payload.data)
    }),
  [constants.CREATE_CONNECTIONS_PENDING]: (state) =>
    state.merge({
      creating: true,
      error: null
    }),
  [constants.CREATE_CONNECTIONS_REJECTED]: (state, action) =>
    state.merge({
      creating: false,
      error: `An error occured while creating the connections: ${action.errorMessage}`
    }),
  [constants.CREATE_CONNECTIONS_FULFILLED]: (state, action) =>
    state.merge({
      creating: false,
      error: null
    })
});
