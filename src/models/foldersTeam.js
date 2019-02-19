import { queryMenuFoldersTeam } from '@/services/foldersTeam';
import { queryEmails } from '@/services/emails';
import { arrayToTree } from 'performant-array-to-tree';
import { toFlatList, toPageInfo } from "../utils/emailProcessing.utils";
import router from "umi/router";

export default {
  namespace: 'foldersTeam',

  state: {
    foldersTeam: [],
    currentFolder: null,
    defaultSelectedKeys: []
  },

  effects: {
    *fetch({ payload }, {call, put }) {
      const response = yield call(queryMenuFoldersTeam, payload);

      response.folders.sort((elementA, elementB) => {
        return elementA.folderOrder - elementB.folderOrder;
      });

      yield put({
        type: 'queryList',
        payload: arrayToTree(response.folders)
      });
    },
    *saveCurrentWithoutTeam({ payload }, { call, put }) {
      yield put({
        type: 'saveCurrentFolder',
        payload: payload,
      });

      // get email by folder selected
      const emailResponse = yield call(queryEmails, 'folderId=' + payload);
      yield put({
        type: 'emails/queryList',
        items: toFlatList(emailResponse.items),
        pageInfo: toPageInfo(emailResponse),
      });
    },
    *saveCurrent({ payload }, { call, put }) {
      yield put({
        type: 'saveCurrentFolder',
        payload: payload.selectedFolderId,
      });

      router.replace('/mail/team/'+ payload.currentTeamId +'/folder/' + payload.selectedFolderId);
      // get email by folder selected
      const emailResponse = yield call(queryEmails, 'folderId=' + payload.selectedFolderId);
      yield put({
        type: 'emails/queryList',
        items: toFlatList(emailResponse.items),
        pageInfo: toPageInfo(emailResponse),
      });

      yield put({
        type: 'emails/showSearchStatus',
        isShowSearchForm: false,
      });

      yield put({
        type: 'emails/searchData',
        searchData: {folderId: payload.selectedFolderId},
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        foldersTeam: action.payload,
      };
    },
    saveCurrentFolder(state, action) {
      return {
        ...state,
        currentFolder: action.payload || null,
        defaultSelectedKeys: [action.payload + ''] || [],
      };
    },
  },
};
