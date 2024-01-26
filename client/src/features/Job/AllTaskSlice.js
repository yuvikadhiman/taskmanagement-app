import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CustomFetch from "../../Utilis/axios";

const initialFilterState = {
    search: "",
    searchStatus: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],
  };

  const initialState = {
    isLoading: false,
    tasks: [],
    totalTask: 0,
    ...initialFilterState,
  };


  export const getAllTasks = createAsyncThunk(
    "allJobs/getJobs",
    async (_, thunkAPI) => {
      const {search, sort, searchStatus } =
        thunkAPI.getState().allJobs;
      let url = `/tasks?status=${searchStatus}&sort=${sort}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      try {
        const resp = await CustomFetch.get(url, {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

  const AllJobSlice = createSlice({
    name: "allTasks",
    initialState,
    reducers: {
      showLoading: (state) => {
        state.isLoading = true;
      },
      hideLoading: (state) => {
        state.isLoading = false;
      },
      handleChange: (state, { payload: { name, value } }) => {
        state.page = 1;
        state[name] = value;
      },
      clearFilters: (state) => {
        return { ...state, ...initialFilterState };
      },
    },
    extraReducers:(builder) =>{

       builder.addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
       builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload.tasks;
        state.totalTask = payload.totalTask;
      })
       builder.addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
    }
  });
  export const {
    showLoading,
    hideLoading,
    handleChange,
    clearFilters,
  } = AllJobSlice.actions;
  export default AllJobSlice.reducer;
  