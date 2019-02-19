import { queryMenuTeams } from '@/services/menuTeams';
import { queryMenuFoldersTeam } from '@/services/foldersTeam';
import { queryEmails } from '@/services/emails';
import { arrayToTree } from "performant-array-to-tree";
import { toFlatList, toPageInfo } from "../utils/emailProcessing.utils";
import router from 'umi/router';

export default {
  namespace: 'menuTeams',

  state: {
    menuTeams: [],
    currentTeam: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenuTeams, payload);
      let teams = {
        menus: [],
      };

      response.data.map(item => {
        let team = {
          id : item.id,
          name : item.name
        };
        teams.menus.push(team);
      });

      yield put({
        type: 'queryList',
        payload: teams,
      });
    },
    *saveCurrent({ payload }, { call, put }) {

      // payload = teamId

      // FIXME: replace call API get team list by get team by teamId (payload)
      const response = yield call(queryMenuTeams);
      const list = response.data.filter(item => item.id == payload);
      if (list.length) {
        const currentTeam = list[0];
        yield put({
          type: 'saveCurrentTeam',
          payload: currentTeam,
        });

        // get folder by team
        const folderResponse = yield call(queryMenuFoldersTeam, payload);

        if (folderResponse && folderResponse.folders && folderResponse.folders.length) {
          folderResponse.folders.sort((elementA, elementB) => {
            return elementA.folderOrder - elementB.folderOrder;
          });

          yield put({
            type: 'foldersTeam/queryList',
            payload: arrayToTree(folderResponse.folders),
          });
        }
      }
    },
    *saveCurrentWithDefaultFolder({ payload }, { call, put }) {

      // payload = teamId

      // FIXME: replace call API get team list by get team by teamId (payload)
      const response = yield call(queryMenuTeams);
      const list = response.data.filter(item => item.id == payload);
      if (list.length) {
        const currentTeam = list[0];
        yield put({
          type: 'saveCurrentTeam',
          payload: currentTeam,
        });

        // get folder by team
        const folderResponse = yield call(queryMenuFoldersTeam, payload);
        if (folderResponse && folderResponse.folders && folderResponse.folders.length) {
          folderResponse.folders.sort((elementA, elementB) => {
            return elementA.folderOrder - elementB.folderOrder;
          });

          yield put({
            type: 'foldersTeam/queryList',
            payload: arrayToTree(folderResponse.folders),
          });

          const defaultList = folderResponse.folders.filter(f => f.defaultFolder);
          let defaultFolder = {};
          if (defaultList.length) {
            defaultFolder = defaultList[0];
          } else {
            defaultFolder = folderResponse.folders[0];
          }
          router.replace('/mail/team/'+ payload +'/folder/' + defaultFolder.id);

          yield put({
            type: 'foldersTeam/saveCurrentFolder',
            payload: defaultFolder.id,
          });

          // get email by folder selected
          const emailResponse = yield call(queryEmails, 'folderId=' + defaultFolder.id);
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
            searchData: {folderId: defaultFolder.id},
          });
        }
      }
    },

  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        menuTeams: action.payload.menus,
      };
    },
    saveCurrentTeam(state, action) {
      return {
        ...state,
        currentTeam: action.payload || {}
      };
    },
  },
};
