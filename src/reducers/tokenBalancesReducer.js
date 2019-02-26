import * as currencyCodes from '../common/currencyCodes';
import { GET_TOKEN_BALANCE_SUCCESS, UNLOCK_TOKEN_SUCCESS, LOCK_TOKEN_SUCCESS, GET_TOKEN_LOCK_SUCCESS } from '../actions';


const usedTokens = {
    [currencyCodes.DAI]: {
        amount: null,
        unlocked: null,
        name: 'DAI'
    },
    [currencyCodes.MKR]: {
        amount: null,
        unlocked: null,
        name: 'MKR'
    },
    [currencyCodes.REP]: {
        amount: null,
        unlocked: null,
        name: 'REP'
    },
    [currencyCodes.ZRX]: {
        amount: null,
        unlocked: null,
        name: 'ZRX'
    }
};

export default function (state = usedTokens, action) {
    switch (action.type) {
        case GET_TOKEN_BALANCE_SUCCESS:
            return {
                ...state,
                [action.token]:
                {
                    ...state[action.token],
                    amount: action.amount
                }
            };
        case UNLOCK_TOKEN_SUCCESS:
            return {
                ...state,
                [action.token]:
                {
                    ...state[action.token],
                    unlocked: true
                }
            };
        case LOCK_TOKEN_SUCCESS:
            return {
                ...state,
                [action.token]:
                {
                    ...state[action.token],
                    unlocked: false
                }
            };
        case GET_TOKEN_LOCK_SUCCESS:
            return {
                ...state,
                [action.token]:
                {
                    ...state[action.token],
                    unlocked: action.unlocked
                }
            };
        default:
            return state;
    }
}