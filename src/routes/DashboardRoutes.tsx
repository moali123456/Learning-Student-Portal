import { RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import AdminLayout from "../layout/admin-layout/admin-layout";
import SchoolAdminStudents from "../component/school-admin/students/students";
import StudentsExams from "../component/school-admin/exams/students-exams";
import { StudentFilePage } from "../pages/school-admin-view";

const dashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: <PrivateRoute allowedRoles={["admin"]} />, // Protect dashboard routes
  children: [
    {
      path: "",
      element: <AdminLayout />,
      children: [
        { index: true, element: <SchoolAdminStudents /> },
        { path: "students", element: <SchoolAdminStudents /> },
        { path: "students-files", element: <StudentFilePage /> },
        { path: "students-exams", element: <StudentsExams /> },
        { path: "students-exams", element: <StudentsExams /> },
        { path: "Reports", element: <Reports /> },
      ],
    },
  ],
};

export default dashboardRoutes;
