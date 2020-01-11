import { createAction, props } from "@ngrx/store";
import { CourseInterface } from "src/app/domain/interfaces/course";

export const loadCourses = createAction("[Courses] Load");

export const loadCoursesSuccess = createAction(
  "[Courses] Load Success",
  props<{ courses: CourseInterface[]; lastLoaded: boolean }>()
);

export const loadMoreCourses = createAction(
  "[Courses] Load More",
  props<{ startNum: number }>()
);

export const loadMoreCoursesSuccess = createAction(
  "[Courses] Load More Success",
  props<{ courses: CourseInterface[]; lastLoaded: boolean }>()
);

export const filterByTitle = createAction(
  "[Courses] Filter By Title",
  props<{ title: string }>()
);

export const updateCourse = createAction(
  "[Course] Update",
  props<{ course: CourseInterface }>()
);

export const replaceCourseInStore = createAction(
  "[Course] Replace",
  props<{ newInstance: CourseInterface }>()
);

export const updateCoursesByIds = createAction(
  "[Course] Update By Ids",
  props<{ coursesIds: string[] }>()
);
