import { useEffect, useState } from "react";
import {
  fetchGradeSelectionOptions,
  fetchLevelSelectionOptions,
  fetchSubjectSelectionOptions,
} from "../../api/services/Reports.services";
import Input from "../../component/Reports/Input";
import ReportDownload from "../../component/Reports/ReportDownload";
import Selector from "../../component/Reports/Selector";
import AttainmentReport from "./Attainment/AttainmentReport";
import StudentMarks from "./StudentMarks/StudentMarks";

interface Option {
  value: string;
  label: string;
}

export default function SelectionForm() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null); // Prevents unnecessary re-renders
  const [formData, setFormData] = useState<FormData>({
    selectedYear: "",
    subject: "",
    grade: "",
    level: "",
    studentCode: "",
    reportType: "",
  });

  const [reportOptions, setreportOptions] = useState<Option[] | []>([]);
  const [yearOptions, setyearOptions] = useState<Option[] | []>([]);
  const [gradeOptions, setgradeOptions] = useState<Option[] | []>([]);
  const [levelOptions, setlevelOptions] = useState<Option[] | []>([]);
  const [subjectOptions, setsubjectOptions] = useState<Option[] | []>([]);

  const [loading, setLoading] = useState(true); // Loader state

  const fetchOptions = async () => {
    try {
      const [dataGrade, dataLevel, dataSubject] = await Promise.all([
        fetchGradeSelectionOptions({}),
        fetchLevelSelectionOptions({}),
        fetchSubjectSelectionOptions({}),
      ]);

      setgradeOptions(dataGrade || []);
      setlevelOptions(dataLevel || []);
      setsubjectOptions(dataSubject || []);
      setreportOptions([
        { value: "attainment", label: "Attainment Report" },
        { value: "student", label: "Student Marks" },
      ]);
      setyearOptions([
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
      ]);
    } catch (error) {
      console.error("Failed to fetch selection options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [formData.selectedYear]);
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated Form Data:", updatedData);
      return updatedData;
    });
  };
  const handleSearchClick = () => {
    setSubmittedData(formData); 
  };

  const renderComponent = () => {
    if (!submittedData) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          Please select a report type and click search
        </div>
      );
    }

    switch (submittedData.reportType) {
      case "attainment":
        return <AttainmentReport formData={submittedData} />;
      case "student":
        return <StudentMarks formData={submittedData}/>;
      default:
        return (
          <div className="w-full h-full flex justify-center items-center">
            Report type not selected
          </div>
        );
    }
  };
  return (
    <div className="ps-10w w-full max-w-full flex flex-col items-start justify-start gap-8 ">
      <div className="w-full flex justify-between gap-2">
        <Selector
          name="reportType"
          value={formData.reportType}
          onChange={(value) => handleChange("reportType", value)}
          options={reportOptions}
          placeholder="report"
          loading={loading}
        />
        <Selector
          name="selectedYear"
          value={formData.selectedYear}
          onChange={(value) => handleChange("selectedYear", value)}
          options={yearOptions}
          placeholder="Year"
          loading={loading}
        />
        <Selector
          name="subject"
          value={formData.subject}
          onChange={(value) => handleChange("subject", value)}
          options={subjectOptions}
          placeholder="Subject"
          loading={loading}
        />
        <Selector
          name="grade"
          value={formData.grade}
          onChange={(value) => handleChange("grade", value)}
          options={gradeOptions}
          placeholder="Grade"
          loading={loading}
        />
        <Selector
          name="level"
          value={formData.level}
          onChange={(value) => handleChange("level", value)}
          options={levelOptions}
          placeholder="Level"
          loading={loading}
        />
        <Input
          name="studentCode"
          value={formData.studentCode}
          placeholder="Student code"
          onChange={(value) => handleChange("studentCode", value)}
        />
        <div
          className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer flex items-center justify-center"
          onClick={handleSearchClick}
        >
          Search
        </div>
        <ReportDownload apiCall={() => {}} />
      </div>
      <div className=" w-full h-[calc(100vh-180px)] overflow-y-scroll  bg-white p-6 rounded-lg shadow-2xl space-y-3">
        {renderComponent()}
      </div>
    </div>
  );
}
