import axios from 'axios';
import {API_URL} from './urls';

const DEBTS_URL = `${API_URL}/Debts`;

export default {
  getAll(status){
    return axios.get(DEBTS_URL, {params: {status}}).then(resp => resp.data);
  },
  getForDebtor(status, debtorAddress){
    return axios.get(DEBTS_URL, {params: {status, debtorAddress}}).then(resp => resp.data);
  },
  getForCreditor(status, creditorAddress){
    return axios.get(DEBTS_URL, {params: {status, creditorAddress}}).then(resp => resp.data);
  },
  post(debtOrder){
    return axios.post(DEBTS_URL, debtOrder);
  },
  put(id, debtOrder){
    let url = `${DEBTS_URL}/${id}`;

    return axios.put(url, debtOrder);
  }
}