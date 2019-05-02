import {
  GET_TOKEN_BALANCE_SUCCESS,
  UNLOCK_TOKEN,
  UNLOCK_TOKEN_SUCCESS,
  UNLOCK_TOKEN_FAIL,
  LOCK_TOKEN,
  LOCK_TOKEN_SUCCESS,
  LOCK_TOKEN_FAIL,
  GET_TOKEN_LOCK,
  GET_TOKEN_LOCK_SUCCESS,
  GET_TOKEN_NAME_SUCCESS
} from '../actions';
import { SUPPORTED_TOKENS } from '../common/api/config';


function getTokens() {
  const tokens = {};
  SUPPORTED_TOKENS.forEach(token => {
    tokens[token] = {
      amount: null,
      unlocked: null,
      name: null,
      lockProcessing: false
    }
  });

  return tokens
}

export default function (state = getTokens(), action) {
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
    case LOCK_TOKEN:
    case UNLOCK_TOKEN:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            lockProcessing: true
          }
      };
    case UNLOCK_TOKEN_SUCCESS:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            unlocked: true,
            lockProcessing: false
          }
      };
    case LOCK_TOKEN_SUCCESS:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            unlocked: false,
            lockProcessing: false
          }
      };
    case LOCK_TOKEN_FAIL:
    case UNLOCK_TOKEN_FAIL:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            lockProcessing: false
          }
      };
    case GET_TOKEN_LOCK:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            lockProcessing: true
          }
      };
    case GET_TOKEN_LOCK_SUCCESS:
      return {
        ...state,
        [action.token]:
          {
            ...state[action.token],
            unlocked: action.unlocked,
            lockProcessing: false
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