import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    isLoggedIn: false,
    loggingIn: false,
    user: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
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
    }    
  },
  
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess, loggingIn } =  userAuthSlice.actions

export default userAuthSlice.reducer