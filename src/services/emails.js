import request from '@/utils/request';
import emailSearchError from '@/utils/emailSearchError';
import { api_mails } from '../constants/apiList';

export async function queryEmails(param) {
  var requestApi = api_mails;
  if (param) {
    requestApi = requestApi + '?' + param;
  }
  return request(requestApi, {
    method: 'GET',
    body: JSON.stringify()
  }).then(response => {
    if (response.errors != undefined && response.errors.length > 0) {
      emailSearchError(response.errors)
    }
    return response;
  });
}

export async function getById(id) {
  let url = api_mails + '/' + id;
  return request(url, {
    method: 'GET'
  }).then(response => {
    return response;
  });
}