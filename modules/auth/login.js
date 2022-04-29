import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {
    call,
    delay,
    put,
    takeLatest,
    select,
    throttle
} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    loginUser: {name:"홍길동"},
    loginError: null,
    isLoggined: false,
    token: ''
}

// type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)

export function* loginSaga() {
    yield takeLatest(LOGIN_REQUEST, signin);
    yield takeLatest(LOGOUT_REQUEST, logout);
}

function* signin(action) {
    try {
        alert(" 8888 ")
        const response = yield call(loginAPI, action.payload)
        const result = response
            .data
            console
            .log(" ########## ")
        alert('>>>>>>>>' + JSON.stringify(result))
        console.log(" ########## ")
        yield put({type: LOGIN_SUCCESS, payload: result})
        yield put({type: SAVE_TOKEN, payload: result.token})
        yield put(window.location.href = "/user/profile")
    } catch (error) {
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

function* logout() {
    try {
        const response = yield call(logoutAPI);
        console.log(`로그아웃 성공: ${response.data.message}`)
        yield put({type: LOGOUT_SUCCESS});
        yield put({type: DELETE_TOKEN});
        yield put(window.location.href = "/")
    } catch (error) {
        console.log(`로그아웃 실패: ${e}`);
        yield put({type: LOGOUT_FAILURE});
    }
}

const logoutAPI = () => axios.post(`${SERVER}/user/logout`, {}, {headers})

/**
const login = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        loginUser: action.payload,
        isLoggined: true
    }),
    [LOGIN_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [LOGOUT_SUCCESS]: (state, _action) => ({
        ...state,
        loginUser: null,
        isLoggined: false
    }),
    [LOGOUT_FAILURE]: (state, action) => ({
        ...state,
        loginError: action.payload // result
    }),
    [SAVE_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload // result.token
    }),
    [DELETE_TOKEN]: (state, action) => ({
        ...state,
        token: ''
    })
}, initialState)
 */

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOGIN_SUCCESS:
                alert(' 000000 로그인 성공 ### ' + JSON.stringify(action.payload))
                draft.isLoggined= true
                draft.loginUser = action.payload
                alert(' 111111 로그인 성공 ### ' + JSON.stringify(draft.loginUser.name))
                break;
            case LOGIN_FAILURE:
                console.log(' ### 로그인 실패 ### ' + JSON.stringify(action.payload))
                break;
            default:
                break;
        }
    })
}

export default reducer