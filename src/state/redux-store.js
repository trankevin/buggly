import { configureStore } from '@reduxjs/toolkit'
import bugsReducer from './bugsSlice'
import myProjectsReducer from './myProjectsSlice'

export default configureStore({
  reducer: {
    bugs: bugsReducer,
    myProjects: myProjectsReducer
  }
})