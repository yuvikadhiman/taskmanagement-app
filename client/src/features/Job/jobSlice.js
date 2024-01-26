import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CustomFetch from "../../Utilis/axios";
import { getAllTasks, hideLoading } from "./AllTaskSlice";

const initialState = {
    isLoading: false,
    task: "",
    description: "",
    statusOptions: ["completed", "pending", "active"],
    status: "pending",
    isEditing: false,
    editTaskId: "",
  };


  export const createTask = createAsyncThunk(
    "task/createTask",
    async (task, thunkAPI) => {
      try {
        const resp = await CustomFetch.post("/tasks", task, {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        thunkAPI.dispatch(clearValues());
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );


  export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (taskId, thunkAPI) => {
      try {
        const resp = await CustomFetch.delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        thunkAPI.dispatch(getAllTasks());
        return resp.data;
      } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );


  export const editTask = createAsyncThunk(
    'task/editTask',
    async ({ taskId, task }, thunkAPI) => {
      try {
        const resp = await CustomFetch.patch(`/tasks/${taskId}`, task, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        thunkAPI.dispatch(clearValues());
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );


  const jobSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
      handleChange: (state, { payload: { name, value } }) => {
        state[name] = value;
      },
      clearValues: () => {
        return {
          ...initialState,
        };
        //   return initialState;
      },
      setEditJob: (state, { payload }) => {
        return { ...state, isEditing: true, ...payload };
        },
      
    },
    extraReducers: (builder) =>{
      // --------createTask post -----------
      builder.addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      builder.addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Task Created");
      })
      builder.addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      builder.addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      builder.addCase(editTask.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Task Modified...');
      })
      builder.addCase(editTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
    }
  });
  

  export const { handleChange, clearValues,setEditJob } = jobSlice.actions;
  export default jobSlice.reducer;
  