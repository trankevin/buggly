import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import DatabaseService from 'services/DatabaseService';

export const myProjectsSlice = createSlice({
  name: 'myProjects',
  initialState: [],
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  },
  extraReducers(builder) {
    builder.addCase(fetchMyProjects.fulfilled, (state, action) => {
       return action.payload;
      })
    }
})
export const fetchMyProjects = createAsyncThunk('myProjects/fetchMyProjects', async (uid) => {
    try {
        const projects = await DatabaseService.getMyProjects(uid);
        return projects;
    } catch (error) {
        
    }
    
    return;
})

// Action creators are generated for each case reducer function
//export const { initBugs } =  bugsSlice.actions

export default myProjectsSlice.reducer