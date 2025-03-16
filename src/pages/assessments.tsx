import React from "react";
import { useGetStudentExamsQuery } from "../api/studentApi"; // Import RTK Query hook
import { BASE_IMG_URL } from "../api/endpoint";

const Assessments: React.FC = () => {
  const { data: response, error, isLoading } = useGetStudentExamsQuery();

  const exams =
    response?.StatusCode === 200 && Array.isArray(response.Data)
      ? response.Data
      : [];

  return (
    <div className="assessment-wrapper">
      <div className="assessment-grid grid grid-cols-12 gap-4">
        {isLoading && <p>Loading assessments...</p>}
        {error && <p className="text-red-500">Error: Failed to load exams</p>}
        {!isLoading && !error && exams.length === 0 && (
          <p>No assessments available at this time.</p>
        )}
        {!isLoading &&
          !error &&
          exams.length > 0 &&
          exams.map((exam, index) => (
            <div
              key={index}
              className="assessment-item col-span-12 md:col-span-3"
            >
              <div className="img-wrapper">
                <img
                  src={
                    exam.Imag
                      ? `${BASE_IMG_URL}/${exam.Imag}`
                      : "/assets/assessment/assess.svg"
                  }
                  alt="Assessment"
                />
              </div>
              <p>{exam.TitleEn || "Assessment Title"}</p>
              <a
                href={`/student/details/${exam.ExamId}`}
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Assessments;
