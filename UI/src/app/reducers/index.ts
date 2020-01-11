import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as Auth from "./auth/auth.reducer";
import * as Courses from "./courses/courses.reducer";
import { CourseInterface } from "src/app/domain/interfaces/course";

export interface State {
  authData: Auth.State;
  coursesData: Courses.State;
}

export const reducers: ActionReducerMap<State> = {
  authData: Auth.reducer,
  coursesData: Courses.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [logger];

// Selectors

export const getAuthData = createFeatureSelector("authData");

export const selectStoreUser = createSelector(
  getAuthData,
  (authData: Auth.State) => authData.user
);

export const getUserToken = createSelector(
  getAuthData,
  (authData: Auth.State) => authData.token
);

export const getCoursesData = createFeatureSelector("coursesData");

export const getStoreCourses = createSelector(
  getCoursesData,
  (coursesData: Courses.State) => coursesData.courses
);

export const lastCourseIsLoaded = createSelector(
  getCoursesData,
  (coursesData: Courses.State) => coursesData.lastLoaded
);

export const getCourseById = createSelector(
  getStoreCourses,
  (courses: CourseInterface[], props) =>
    courses.find(course => course.id === props.id)
);
