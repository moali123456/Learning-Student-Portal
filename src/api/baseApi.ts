import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(), // Uses Axios instead of fetchBaseQuery
  endpoints: () => ({}), // Empty because we will extend this in other files
});
