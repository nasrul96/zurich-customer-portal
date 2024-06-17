import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  showEmails: Record<number, boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  totalPages: number;
}

const initialState: UsersState = {
  users: [],
  showEmails: {},
  status: "idle",
  page: 1,
  totalPages: 1,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await res.json();
    console.log(data);
    return {
      users: data.data,
      page: data.page,
      totalPages: data.total_pages,
    };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleEmail: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.showEmails[id] = !state.showEmails[id];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleEmail, setPage } = usersSlice.actions;

export const useUsers = () =>
  useSelector((state: RootState) => state.users.users);
export const useShowEmails = () =>
  useSelector((state: RootState) => state.users.showEmails);
export const useStatus = () =>
  useSelector((state: RootState) => state.users.status);
export const usePage = () =>
  useSelector((state: RootState) => state.users.page);
export const useTotalPages = () =>
  useSelector((state: RootState) => state.users.totalPages);

export default usersSlice.reducer;
