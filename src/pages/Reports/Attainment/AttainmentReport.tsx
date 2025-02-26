import { useEffect, useState } from "react";
import ABTAssessments from "./sections/ABTAssessments";
import AttainmentSkillsRanges from "./sections/AttainmentSkillsRanges";
import CombinedGrades from "./sections/CombinedGrades";
import LandingSection from "./sections/LandingSection";
import ReportTable from "./sections/ReportTable";
import { previewStudentAttaimentReport } from "../../../api/services/Reports.services";
import { ExamResultType, FormData } from "../../../models/types";
import ExamChartsTables from "./sections/ExamChartsTables";
import Images from "../../../assets/images/Images";
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-full">
      {loading ? (
        <div className="text-2xl font-bold text-gray-500">
          <img src={Images.loader_1} />
        </div>
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
