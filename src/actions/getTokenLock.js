import { getPrincipalTokenLockAsync } from '../common/services/tokenService';

export const GET_TOKEN_LOCK = 'GET_TOKEN_LOCK';
export const GET_TOKEN_LOCK_SUCCESS = 'GET_TOKEN_LOCK_SUCCESS';

export function getTokenLock(token) {
    return dispatch => {
        dispatch({
            type: GET_TOKEN_LOCK,
            token
        });


        getPrincipalTokenLockAsync(token).then(unlocked => {
            dispatch({
                type: GET_TOKEN_LOCK_SUCCESS,
                token: token,
                unlocked
            });
        });
    };
}