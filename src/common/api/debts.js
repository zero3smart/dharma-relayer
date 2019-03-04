import axios from 'axios';
import { API_URL } from './config';

const DEBTS_URL = `${API_URL}/Debts`;

function mapGetResponse(response) {
  console.log('getResponse headers:', response.headers);
  let totalItemsCount = response.headers['x-total-count'];
  console.log('getResponse totalItemsCount :', totalItemsCount);
  return {
    items: response.data,
    totalItemsCount: totalItemsCount
  };
}

export default {
  getAll(status, offset, limit) {
    return axios.get(DEBTS_URL, { params: { status, offset, limit } }).then(mapGetResponse);
  },
  getForDebtor(status, debtorAddress) {
    return axios.get(DEBTS_URL, { params: { status, debtorAddress } }).then(resp => resp.data);
  },
  getForCreditor(status, creditorAddress) {
    return axios.get(DEBTS_URL, { params: { status, creditorAddress } }).then(resp => resp.data);
  },
  post(debtOrder) {
    return axios.post(DEBTS_URL, debtOrder);
  },
  put(id, debtOrder) {
    let url = `${DEBTS_URL}/${id}`;

    return axios.put(url, debtOrder);
  }
}