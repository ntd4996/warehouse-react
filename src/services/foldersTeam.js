import request from '@/utils/request';
import {api_folder_team} from "../constants/apiList";

export async function queryMenuFoldersTeam(teamId) {
  return request(api_folder_team + "/" + teamId,{
    method: 'GET',
    body: JSON.stringify()
  });
}
