import request from '@/utils/request';
import {api_teams_menu} from "../constants/apiList";
import {TOKEN} from "../constants/TextJSConstant";

export async function queryMenuTeams() {
  return request(api_teams_menu,{
    method: 'GET',
    body: JSON.stringify(),
    headers: {
       'token': TOKEN,
    }
  });
}
