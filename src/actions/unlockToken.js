import { unlockTokenAsync } from '../common/services/tokenService';

export const UNLOCK_TOKEN = 'UNLOCK_TOKEN';
export const UNLOCK_TOKEN_SUCCESS = 'UNLOCK_TOKEN_SUCCESS';
export const UNLOCK_TOKEN_FAIL = 'UNLOCK_TOKEN_FAIL';


export function unlockToken(token) {
    return dispatch => {
        dispatch({
            type: UNLOCK_TOKEN,
            token
        });


        unlockTokenAsync(token, true)
            .then(() => {
                dispatch({
                    type: UNLOCK_TOKEN_SUCCESS,
                    token
                });
            })
            .catch(err => {
                dispatch({
                    type: UNLOCK_TOKEN_FAIL,
                    token
                });
            });
    };
}