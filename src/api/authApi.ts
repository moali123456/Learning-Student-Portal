import { AdminUser, StudentUser } from "../types/auth";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation<
      StudentUser,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/Account/StudentLogin",
        method: "POST",
        data: {
          UserName: credentials.username,
          Password: credentials.password,
        },
      }),
      transformResponse: (response: any): StudentUser => ({
        userId: response.Data.UserId,
        name: response.Data.Name,
        token: response.Data.token,
        role: "student",
        schoolId: response.Data.SchoolId || null,
      }),
    }),

    adminSchoolLogin: builder.mutation<
      AdminUser,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/Account/AdminSchoolLogin",
        method: "POST",
        data: {
          UserName: credentials.username,
          Password: credentials.password,
        },
      }),
      transformResponse: (response: any): AdminUser => ({
        userId: response.Data.UserId,
        name: response.Data.Name,
        token: response.Data.token,
        role: "admin",
        email: response.Data.Email || "",
        phone: response.Data.Phone || "",
        schoolId: response.Data.SchoolId,
      }),
    }),
  }),
});

export const { useStudentLoginMutation, useAdminSchoolLoginMutation } = authApi;
