import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { RootState } from "./store";
import { AuthState, StudentUser, AdminUser } from "../types/auth";

// Load authentication state from local storage
const storedToken = localStorage.getItem("token");
const storedUserId = localStorage.getItem("userId");
const storedUserName = localStorage.getItem("userName");
const storedSchoolId = localStorage.getItem("schoolId");
const storedRole = localStorage.getItem("role") as "student" | "admin" | null;

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  token: storedToken || null,
  userId: storedUserId || null,
  userName: storedUserName || null,
  schoolId: storedSchoolId || null,
  role: storedRole || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.userName = null;
      state.schoolId = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.studentLogin.matchFulfilled,
        (state, action: PayloadAction<StudentUser>) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userId = action.payload.userId;
          state.userName = action.payload.name;
          state.schoolId = action.payload.schoolId;
          state.role = "student";

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("userId", action.payload.userId);
          localStorage.setItem("userName", action.payload.name);
          if (action.payload.schoolId) {
            localStorage.setItem("schoolId", action.payload.schoolId);
          }
          localStorage.setItem("role", "student");
        }
      )
      .addMatcher(
        authApi.endpoints.adminSchoolLogin.matchFulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userId = action.payload.userId;
          state.userName = action.payload.name;
          state.schoolId = action.payload.schoolId;
          state.role = "admin";

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("userId", action.payload.userId);
          localStorage.setItem("userName", action.payload.name);
          localStorage.setItem("role", "admin");
        }
      );
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectSchoolId = (state: RootState) => state.auth.schoolId;
export const selectRole = (state: RootState) => state.auth.role;
export default authSlice.reducer;
