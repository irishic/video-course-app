import { createAction, props } from "@ngrx/store";
import { LoginData } from "../domain/interfaces/login-data";
import { UserDataHttpResponse } from "src/app/domain/interfaces/user-data-http-response";

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ userData: UserDataHttpResponse }>()
);

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: any }>()
);

export const login = createAction("[Auth] Login Attempt", props<LoginData>());

export const updateWithCookies = createAction("[Auth] Cookies");

export const logout = createAction("[Auth] Logout");
