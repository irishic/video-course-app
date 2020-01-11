import { Action, createReducer, on } from "@ngrx/store";
import { CourseInterface } from "src/app/domain/interfaces/course";
import {
  loadCoursesSuccess,
  loadMoreCoursesSuccess,
  replaceCourseInStore,
  updateCoursesByIds
} from "src/app/actions/courses.actions";

export const coursesFeatureKey = "courses";

export interface State {
  courses: CourseInterface[];
  lastLoaded: boolean;
}

export const initialState: State = {
  courses: [],
  lastLoaded: false
};

const coursesReducer = createReducer(
  initialState,
  on(loadCoursesSuccess, (state, action) => {
    const { courses, lastLoaded } = action;
    return { courses, lastLoaded };
  }),
  on(loadMoreCoursesSuccess, (state, action) => {
    const { courses, lastLoaded } = action;
    const coursesCopy = [...state.courses, ...courses];
    return { courses: coursesCopy, lastLoaded };
  }),
  on(replaceCourseInStore, (state, action) => {
    const { newInstance } = action;
    const coursesCopy = state.courses.map(stateCourse =>
      stateCourse.id !== newInstance.id ? stateCourse : newInstance
    );
    return { courses: coursesCopy, lastLoaded: state.lastLoaded };
  }),
  on(updateCoursesByIds, (state, action) => {
    const { coursesIds } = action;
    return {
      courses: state.courses.filter(course => coursesIds.includes(course.id)),
      lastLoaded: state.lastLoaded
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return coursesReducer(state, action);
}
