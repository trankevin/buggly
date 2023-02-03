import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    isLoggedIn: false,
    loggingIn: false,
    user: null,
    signingUp: false,
    signingSuccess: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
        signingUp: false,
        user: action.payload
      }
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        logginIn: false,
        user: null
      }
    },
    loggingIn: (state) => {
      return {
        ...state,
        loggingIn: true
      }
    },
    loggingInFailed: (state) => {
      return {
        ...state,
        loggingIn: false
      }
    },
    signingUp: (state) => {
      return {
        ...state,
        signingUp: true
      }
    }, 
    signingUpSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
        signingUp: false,
        user: action.payload
      }
    },      
  },
  
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess, loggingIn, loggingInFailed, signingUp, signingUpSuccess } =  userAuthSlice.actions

export default userAuthSlice.reducer