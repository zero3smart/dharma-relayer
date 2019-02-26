import { getTokenNameBySymbolAsync } from '../common/services/tokenService';

export const GET_TOKEN_NAME = 'GET_TOKEN_NAME';
export const GET_TOKEN_NAME_SUCCESS = 'GET_TOKEN_NAME_SUCCESS';

export function getTokenName(symbol) {
    return dispatch => {
        dispatch({
            type: GET_TOKEN_NAME,
            symbol
        });


        getTokenNameBySymbolAsync(symbol).then(name => {
            dispatch({
                type: GET_TOKEN_NAME_SUCCESS,
                token: symbol,
                name
            });
        });
    };
}