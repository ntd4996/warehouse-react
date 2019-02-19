import { queryEmails, getById } from '@/services/emails';

export default {
  namespace: 'emailDetail',

  state: {
    email: []
  },

  effects: {
    // get by id
    *fetch({ emailId }, { call, put }) {
      const response = yield call(getById, emailId);
      yield put({
        type: 'emailDetail',
        email: response,
      });
    },
  },

  reducers: {
    emailDetail(state, action) {
      return {
        ...state,
        email: action.email,
      };
    },
  },
};