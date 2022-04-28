//import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"

export const initialState = {
    loginUser: null,
    loginError: null,
    isLoggined: false
    
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_PENDING = "auth/LOGIN_PENDING";
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGOUT = "auth/LOGOUT"
const DELETE_TOKEN = "auth/DELETE_TOKEN";
const SAVE_TOKEN = "auth/SAVE_TOKEN";
const LOGIN_CANCELLED = "auth/LOGIN_CANCELLED";

export const loginRequest = createAction(LOGIN_REQUEST, data=>data)
export const loginPending = createAction(LOGIN_PENDING, user=>user)
export const loginSuccess = createAction(LOGIN_SUCCESS, user=>user)
export const loginFailure = createAction(LOGIN_FAILURE, user=>user)
export const logout = createAction(LOGOUT, user=>user)
export const deleteToken = createAction(DELETE_TOKEN, user=>user)
export const saveToken = createAction(SAVE_TOKEN, user=>user)
export const loginCanceled = createAction(LOGIN_CANCELLED, user=>user)

export function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}
function* loginSaga(action) {
    try {
        console.log(" **** 여기가 핵심 *** "+JSON.stringify(action))
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버다녀옴: " + JSON.stringify(response.data))
        yield put({type: LOGIN_SUCCESS, payload: response.data})
    } catch (error) {
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}
const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

const login = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log(' ### HYDRATE Issue 발생 ### ')
            return {
                ...state,
                ...action.payload
            }
        case LOGIN_SUCCESS:
            console.log(' ### 로그인 성공 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                isLoggined: action.payload.isLoggined,
                loginUser: action.payload.loginUser
            }
        case LOGIN_FAILURE:
            console.log(' ### 로그인 실패 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

export default login