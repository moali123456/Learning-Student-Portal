// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import StudentLogin from "./pages/login";
import Exams from "./pages/exams";
import Assessments from "./pages/assessments";
import AssessmentsDetails from "./pages/assessments-details";
import PreLogin from "./pages/pre-login";
import Questions from "./pages/questions/questions";
import ReadingQuestions from "./pages/questions/reading/reading-questions";
import WritingQuestions from "./pages/questions/writing/writing-questions";
import { StudentFilePage } from "./pages/school-admin-view";
import StudentLayout from "./layout/sudent-layout/student-layout";
import AdminLayout from "./layout/admin-layout/admin-layout";
import SchoolAdminStudents from "./component/school-admin/students/students";
import StudentsExams from "./component/school-admin/exams/students-exams";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <StudentLogin />,
    },
    {
      path: "/pre-login",
      element: <PreLogin />,
    },
    {
      path: "/student",
      element: <StudentLayout />,
      children: [
        { index: true, element: <Assessments /> },
        { path: "assessments", element: <Assessments /> },
        { path: "exams", element: <Exams /> },
        { path: "assessments", element: <Assessments /> },
        { path: "details/:examId", element: <AssessmentsDetails /> },
        { path: "questions/:examId", element: <Questions /> },
        { path: "reading-questions", element: <ReadingQuestions /> },
        { path: "writing-questions", element: <WritingQuestions /> },
        { path: "*", element: <NotFound /> }
      ],
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        { index: true, element: <SchoolAdminStudents /> },
        { path: "students", element: <SchoolAdminStudents /> },
        { path: "students-files", element: <StudentFilePage /> },
        { path: "students-exams", element: <StudentsExams /> },
      ],
    },
  ]);
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/students-files" element={<StudentFilePage />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/details/:examId" element={<AssessmentsDetails />} />
          <Route path="/pre-login" element={<PreLogin />} />
          <Route path="/questions/:examId" element={<Questions />} />
          <Route path="/reading-questions" element={<ReadingQuestions />} />
          <Route path="/writing-questions" element={<WritingQuestions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router> */}

      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};

export default App;
