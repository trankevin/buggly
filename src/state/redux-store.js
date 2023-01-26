import { configureStore } from '@reduxjs/toolkit'
import bugsReducer from './bugsSlice'
import myProjectsReducer from './myProjectsSlice'
import userAuthSlice from './userAuthSlice'

export default configureStore({
  reducer: {
    bugs: bugsReducer,
    myProjects: myProjectsReducer,
    userAuth: userAuthSlice
  }
})