import axios from 'axios';
import { API_URL } from './config';
import { getKernelVersion } from '../services/dharmaService';

const DEBTS_URL = `${API_URL}/Debts`;
const kernelVersionPromise = getKernelVersion();

function mapGetResponse(response) {
  //console.log('getResponse headers:', response.headers);
  let totalItemsCount = response.headers['x-total-count'];
  //console.log('getResponse totalItemsCount :', totalItemsCount);
  return {
    items: response.data,
    totalItemsCount: parseInt(totalItemsCount, 10)
  };
}

export default {
  getAll(status, offset, limit) {
    return kernelVersionPromise
      .then(kernelAddress => axios.get(DEBTS_URL, { params: { status, offset, limit, kernelAddress } }))
      .then(mapGetResponse);
  },
  getForDebtor(status, debtorAddress, offset, limit) {
    return kernelVersionPromise
      .then(kernelAddress => axios.get(DEBTS_URL, { params: { status, debtorAddress, offset, limit, kernelAddress } }))
      .then(mapGetResponse);
  },
  getForCreditor(status, creditorAddress, offset, limit) {
    return kernelVersionPromise
      .then(kernelAddress => axios.get(DEBTS_URL, { params: { status, creditorAddress, offset, limit, kernelAddress } }))
      .then(mapGetResponse);
  },
  post(debtOrder) {
    return axios.post(DEBTS_URL, debtOrder);
  },
  put(id, debtOrder) {
    let url = `${DEBTS_URL}/${id}`;

    return axios.put(url, debtOrder);
  }
}