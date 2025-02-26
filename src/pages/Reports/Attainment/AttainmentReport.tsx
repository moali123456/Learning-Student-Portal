import { useEffect, useState } from "react";
import ABTAssessments from "./pages/ABTAssessments";
import AttainmentSkillsRanges from "./pages/AttainmentSkillsRanges";
import CombinedGrades from "./pages/CombinedGrades";
import LandingSection from "./pages/LandingSection";
import ReportTable from "./pages/ReportTable";
import { previewStudentAttaimentReport } from "../../../api/services/Reports.services";
import { ExamResultType, FormData } from "../models/types";
import ExamChartsTables from "./pages/ExamChartsTables";
type AttainmentReportProps = {
  formData: FormData;
};
function AttainmentReport({ formData }: AttainmentReportProps) {
  const [loading, setLoading] = useState(false);
  const [examChartsData, setexamChartsData] = useState<ExamResultType[] | []>(
    []
  );

  const getAttainmentReportData = async () => {
    setLoading(true);
    try {
      const data = await previewStudentAttaimentReport(formData);
      console.log("first response", data);
      setexamChartsData(data);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttainmentReportData();
  },[]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-full">
      {loading ? (
        <div className="text-2xl font-bold text-gray-500">Loading...</div>
      ) : (
        <>
          <LandingSection schoolName={"Liwa International School"} />
          <ABTAssessments />
          <AttainmentSkillsRanges />
          <ReportTable />
          <CombinedGrades />
          <ExamChartsTables Data={examChartsData} />
        </>
      )}
    </div>
  );
}

export default AttainmentReport;
