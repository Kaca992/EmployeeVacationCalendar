import * as appActions from '../actionTypes/app';
import { History } from 'history';
import fetcher from '../utils/fetcher';
import { RoutesEnum } from '../common/enums';
import { IAction } from '../common/appDataStructures';
import { IUserInfo } from '../common/data';

const loginControllerBaseUrl = "api/login";

export function setLoggedUser(loggedUserId: string | null): IAction {
    return {
        type: appActions.SET_LOGGED_USER,
        payload: loggedUserId
    };
}

export function loginUser(email: string, password: string, redirectUrl: string, history: History) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(loginControllerBaseUrl, {
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({ email: email && email.trim(), password })
            },
            action: appActions.LOGIN_USER
        }, dispatch).then((result: IUserInfo) => {
            dispatch(setLoggedUser(result.id));
            history.replace(redirectUrl);
        });
    };
}
