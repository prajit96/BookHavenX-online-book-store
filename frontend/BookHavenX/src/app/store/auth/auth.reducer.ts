import { createReducer, on } from '@ngrx/store';
import { loginFailure, loginRequest, loginSuccess } from './auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';

export interface AuthInterface {
  isLoading: boolean;
  token: string;
  userID: string;
  username :string;
  email: string;
  role: string;
  isError: boolean;
}

const localStorageService = new LocalStorageService();

let user = localStorageService.getItem("user");
user = JSON.parse(user) || {};


export const initialAuthState: AuthInterface = {
  isLoading: false,
  token: localStorageService.getItem('token') || '',
  userID: user._id || "",
  username: user.username || '',
  email: user.email || '',
  role: user.role || '',
  isError: false,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(loginRequest, (state) => {
    return { ...state, isLoading: true, isError: false };
  }),
  on(loginSuccess, (state, props) => {
    return { ...state, isLoading: false, isError: false, token: props.token, userID: props.user.userID, username: props.user.username, email: props.user.username, role: props.user.role };
  }),
  on(loginFailure, (state) => {
    return { ...state, isLoading: false, isError: true };
  })
);
