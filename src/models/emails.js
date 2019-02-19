import { queryEmails } from '@/services/emails';
import { toFlatList, toPageInfo } from "../utils/emailProcessing.utils";

export default {
  namespace: 'emails',

  state: {
    items: [],
    pageInfo: {},
    searchData: {},
    isShowSearchForm: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEmails, payload);
      yield put({
        type: 'queryList',
        items: toFlatList(response.items),
        pageInfo: toPageInfo(response),
      });
    },
    *saveSearchStatus({ isShowSearchForm }, { call, put }) {
      yield put({
        type: 'showSearchStatus',
        isShowSearchForm: !!isShowSearchForm,
      });
    },
    *saveSearchData({ searchData }, { call, put }) {
      yield put({
        type: 'searchData',
        searchData: searchData || {},
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        items: action.items,
        pageInfo: action.pageInfo,
      };
    },
    showSearchStatus(state, action) {
      return {
        ...state,
        isShowSearchForm: action.isShowSearchForm,
      };
    },
    searchData(state, action) {
      return {
        ...state,
        searchData: action.searchData,
      };
    },
  },
};
