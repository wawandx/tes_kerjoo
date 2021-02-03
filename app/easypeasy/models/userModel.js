import {action, thunk} from 'easy-peasy';
import axios from 'axios';
import {API_PROFILE} from '@configs/apiConfigs';
import {getLogin} from '@storage/login';

export default {
  stateData: {
    data: {},
    isFetching: false,
    error: null,
  },
  getUser: thunk(async (actions, payload) => {
    actions.onFetching();
    try {
      const token = await getLogin();
      const response = await axios.get(API_PROFILE, {
        headers: {Authorization: `Bearer ${token.replace(/"/g, '')}`},
      });
      actions.onSuccess(response);
    } catch (e) {
      actions.onFailed(e);
    }
  }),
  onSuccess: action((state, payload) => {
    state.stateData = {
      ...state.stateData,
      data: payload.data,
      isFetching: false,
      error: null,
    };
  }),
  onFailed: action((state, error) => {
    state.stateData = {
      ...state.stateData,
      data: {},
      isFetching: false,
      error,
    };
  }),
  onFetching: action((state) => {
    state.stateData = {
      ...state.stateData,
      isFetching: true,
      error: null,
    };
  }),
};
