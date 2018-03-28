import axios from 'axios';
import {API_URL} from './urls';

export default {
  getAll(status, address, offset, limit){
    let url = `${API_URL}/Debts`;

    return axios.get(url, {params: {status, address, offset, limit}}).then(resp => resp.data);
  }
}
