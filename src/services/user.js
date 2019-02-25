import request from '@/utils/request';
import { apiInforMe } from '../constants/apiList';


export async function getInforMe(token) {
  let options = {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token
    }
  };
  return request(apiInforMe, options);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
