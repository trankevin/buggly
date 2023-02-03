import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import DatabaseService from 'services/DatabaseService';

export const bugsSlice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    addBug: (state, action) => {
      state.unshift(action.payload);
    },
    updateBug: (state, action) => {
      return [
          ...state.map(bug => {
            if (bug.id == action.payload.id) {
              return {
                    //dateAdded: action.payload.dateAdded,
                    ...action.payload
              };
            }
            
            return bug;
           }),
          ];
    },
    deleteBug: (state, action) => {
      return [
          ...state.filter((bug) => bug.id !== action.payload)
          ];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBugs.fulfilled, (state, action) => {
       return action.payload;
      })
    }
})
export const fetchBugs = createAsyncThunk('bugs/fetchBugs', async (uid) => {
    try {
        const bugs = await DatabaseService.getBugs(uid);
        return bugs;
    } catch (error) {
        console.log(error);
    }
    return;
})

// Action creators are generated for each case reducer function
export const { addBug, updateBug, deleteBug } =  bugsSlice.actions

export default bugsSlice.reducer