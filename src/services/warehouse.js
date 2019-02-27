import request from '@/utils/request';
import { apiListWarehouse } from '../constants/apiList';
import { getAuthority } from '@/utils/authority';

let auth = getAuthority();

export async function getListWarehouses() {
  let options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth
    }
  };
  return request(apiListWarehouse, options);
}
