import { RouteObject } from "react-router-dom";
import StudentLayout from "../layout/sudent-layout/student-layout";
import Assessments from "../pages/assessments";
import AssessmentsDetails from "../pages/assessments-details";
import Exams from "../pages/exams";
5
import Questions from "../pages/questions";
import PrivateRoute from "./PrivateRoutes";

const studentRoutes: RouteObject = {
  path: "/student",
  element: <PrivateRoute allowedRoles={["student"]} />, // Protect student routes
  children: [
    {
      path: "",
      element: <StudentLayout />,
      children: [
        { index: true, element: <Assessments /> },
        { path: "assessments", element: <Assessments /> },
        { path: "exams", element: <Exams /> },
        { path: "details/:examId", element: <AssessmentsDetails /> },
        { path: "questions/:skill/:examId", element: <Questions /> },
        // { path: "reading-questions", element: <ReadingQuestions /> },
        // { path: "writing-questions", element: <WritingQuestions /> },
      ],
    },
  ],
};

export default studentRoutes;
