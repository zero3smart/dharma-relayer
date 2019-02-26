import BigNumber from 'bignumber.js';

export const RELAYER_ADDRESS = '0x00F34Ad48A326b406bf995E04189e42D285d5773'
export const RELAYER_FEE = new BigNumber(0)
export const SHOW_LOANSCAN_LINK = false;

export const HOST_URL = "http://dharma-relayer-prod-993135204.us-east-1.elb.amazonaws.com/";
export const API_URL = HOST_URL + "/api/v0";
export const LOANSCAN_URL = "http://loanscan.io/loan";

export const SUPPORTED_TOKENS = ['REP', 'ZRX', 'MKR']