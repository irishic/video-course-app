import { Action, createReducer, on } from "@ngrx/store";
import { login, loginSuccess, logout } from "../../actions/auth.actions";
import { User } from "src/app/domain/models/user";
import { UserInterface } from "src/app/domain/interfaces/user";

export const authFeatureKey = "auth";

export interface State {
  user: UserInterface;
  token: string;
}

export const initialState: State = {
  user: null,
  token: null
};

const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state })),
  on(logout, state => ({ user: null, token: null })),
  on(loginSuccess, (state, action) => {
    const { userData } = action;
    const newUser = new User(
      userData.user.id,
      userData.user.firstName,
      userData.user.lastName,
      userData.user.email
    );
    return {
      user: newUser,
      token: userData.accessToken
    };
  })
);

export const getUser = (state: State) => state.user;

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
