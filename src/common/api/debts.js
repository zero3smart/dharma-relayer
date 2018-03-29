import axios from 'axios';
import {API_URL} from './urls';

export default {
  getAll(address, status, offset, limit){
    let url = `${API_URL}/Debts`;

    return axios.get(url, {params: {address, status, offset, limit}}).then(resp => resp.data);
  },
  post(debtOrder){
    let url = `${API_URL}/Debts`;

    return axios.post(url, debtOrder, {'Access-Control-Allow-Origin': '*'});
  }
}
