import { GET_LOANS, GET_LOANS_SUCCESS } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case GET_LOANS:
            return {...state};
        case GET_LOANS_SUCCESS:
            return {...state, loans: action.loans};
        default:
            return state;
    }
}