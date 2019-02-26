import * as currencyCodes from '../common/currencyCodes';
import {
    GET_TOKEN_BALANCE_SUCCESS,
    UNLOCK_TOKEN_SUCCESS,
    LOCK_TOKEN_SUCCESS,
    GET_TOKEN_LOCK_SUCCESS,
    GET_TOKEN_NAME_SUCCESS
} from '../actions';


const usedTokens = {
    [currencyCodes.DAI]: {
        amount: null,
        unlocked: null,
        name: null
    },
    [currencyCodes.MKR]: {
        amount: null,
        unlocked: null,
        name: null
    },
    [currencyCodes.REP]: {
        amount: null,
        unlocked: null,
        name: null
    },
    [currencyCodes.ZRX]: {
        amount: null,
        unlocked: null,
        name: null
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
        case GET_TOKEN_NAME_SUCCESS:
            return {
                ...state,
                [action.token]:
                {
                    ...state[action.token],
                    name: action.name
                }
            };
        default:
            return state;
    }
}