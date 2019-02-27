import request from '@/utils/request';
import { apiInforMe, apiUser } from '../constants/apiList';
import { getAuthority } from '@/utils/authority';

const auth = getAuthority();

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function getInforMe() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth
    }
  };
  return request(apiInforMe, options);
}

export async function getListUser(params) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth
    }
  };
  return request(apiUser + params, options);
}

export async function createUser(params) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + auth
    },
    body: params
  };
  return request(apiUser, options);
}

export async function deleteUser(id) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + auth
    }
  };
  return request(apiUser + '/' + id, options);
}

export async function editUser(id, params) {
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + auth
    },
    body: params
  };
  return request(apiUser + '/' + id, options);
}
