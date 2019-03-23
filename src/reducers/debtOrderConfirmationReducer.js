import {
    SHOW_LOAN_CONFIRMATION,
    HIDE_LOAN_CONFIRMATION,
    CHANGE_DEBT_ORDER_CONFIRMATION_STEP,
    UNLOCK_COLLATERAL_TOKEN_SUCCESS,
    LOCK_COLLATERAL_TOKEN_SUCCESS,
    UNLOCK_COLLATERAL_TOKEN,
    LOCK_COLLATERAL_TOKEN,
    RESET_LOAN_FORM,
    GET_COLLATERAL_TOKEN_LOCK,
    GET_COLLATERAL_TOKEN_LOCK_SUCCESS,
} from '../actions';

const initialState = {
    modalVisible: false,
    stepNumber: 1,
    collateralTokenUnlocked: false,
    unlockInProgress: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_LOAN_CONFIRMATION:
            return { ...state, modalVisible: true, stepNumber: 1, collateralTokenUnlocked: false, ...action.debtOrder };
        case HIDE_LOAN_CONFIRMATION:
            return { ...state, modalVisible: false };
        case CHANGE_DEBT_ORDER_CONFIRMATION_STEP:
            return { ...state, stepNumber: action.step };
        case UNLOCK_COLLATERAL_TOKEN_SUCCESS:
            return { ...state, collateralTokenUnlocked: true, unlockInProgress: false };
        case LOCK_COLLATERAL_TOKEN_SUCCESS:
            return { ...state, collateralTokenUnlocked: false, unlockInProgress: false };
        case UNLOCK_COLLATERAL_TOKEN:
        case LOCK_COLLATERAL_TOKEN:
            return { ...state, unlockInProgress: true };
        case RESET_LOAN_FORM:
            return { ...initialState };
        case GET_COLLATERAL_TOKEN_LOCK_SUCCESS:
            return { ...state, collateralTokenUnlocked: action.unlocked };
        case GET_COLLATERAL_TOKEN_LOCK:
        default:
            return state;
    }
}