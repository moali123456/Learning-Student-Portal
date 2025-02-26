import { useEffect, useState } from "react";
import {
  fetchGradeSelectionOptions,
  fetchLevelSelectionOptions,
  fetchSubjectSelectionOptions,
} from "../../api/services/Reports.services";
import AttainmentReport from "./Attainment/AttainmentReport";
import Input from "./components/Input";
import PreviewBtn from "./components/PreviewBtn";
import Selector from "./components/Selector";
import YearSelector from "./components/YearSelector";
import StudentMarks from "./StudentMarks/StudentMarks";
import { FormData } from "./models/types";

interface Option {
  value: string;
  label: string;
}

export default function SelectionForm() {
  const [formData, setFormData] = useState<FormData>({
    selectedYear: "",
    subject: "",
    grade: "",
    level: "",
    studentCode: "",
  });

  const [gradeOptions, setgradeOptions] = useState<Option[] | []>([]);
  const [levelOptions, setlevelOptions] = useState<Option[] | []>([]);
  const [subjectOptions, setsubjectOptions] = useState<Option[] | []>([]);

  const [loading, setLoading] = useState(true); // Loader state

  const fetchOptions = async () => {
    try {
      const dataGrade = await fetchGradeSelectionOptions({});
      const dataLevel = await fetchLevelSelectionOptions({});
      const dataSubject = await fetchSubjectSelectionOptions({});
      setgradeOptions(dataGrade || []);
      setlevelOptions(dataLevel || []);
      setsubjectOptions(dataSubject || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch selection options:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [formData.selectedYear]); // Fetch options when year changes

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated Form Data:", updatedData);
      return updatedData;
    });
  };

  return (
    <div className="ps-10 w-full flex flex-col items-start justify-start gap-8 ">
      <YearSelector
        selectedYear={formData.selectedYear}
        onSelectYear={(year) => handleChange("selectedYear", year)}
      />

      <div className="space-y-4 w-1/2">
        <Selector
          name="subject"
          value={formData.subject}
          onChange={(value) => handleChange("subject", value)}
          options={subjectOptions}
          placeholder="Subject (required)"
          loading={loading}
        />

        <Selector
          name="grade"
          value={formData.grade}
          onChange={(value) => handleChange("grade", value)}
          options={gradeOptions}
          placeholder="Grade (optional)"
          loading={loading}
        />

        <Selector
          name="level"
          value={formData.level}
          onChange={(value) => handleChange("level", value)}
          options={levelOptions}
          placeholder="Level (optional)"
          loading={loading}
        />

        <Input
          name="studentCode"
          value={formData.studentCode}
          placeholder="Student code (optional)"
          onChange={(value) => handleChange("studentCode", value)}
        />
      </div>
      <div className="w-4/6  bg-white p-6 rounded-lg shadow-lg space-y-3">
        <PreviewBtn
          fileName="student marks Report"
          content={<AttainmentReport formData={formData} />}
        />
        <PreviewBtn fileName="student marks excel" content={<StudentMarks />} />
      </div>
    </div>
  );
}
