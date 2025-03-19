import { useEffect, useState } from "react";
import ABTAssessments from "./sections/ABTAssessments";
import AttainmentSkillsRanges from "./sections/AttainmentSkillsRanges";
import CombinedGrades from "./sections/CombinedGrades";
import LandingSection from "./sections/LandingSection";
import ReportTable from "./sections/ReportTable";
import ExamChartsTables from "./sections/ExamChartsTables";
import Images from "../../../assets/images/Images";
import { previewStudentAttaimentReport } from "../../../api/services/Reports.services";
import { ExamResultType, FormData } from "../../../types/Reports";

function AttainmentReport({ formData }: { formData: FormData }) {
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
  }, [formData]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-full">
      {loading ? (
        <div className="w-[56rem] flex justify-center items-center">
          <img src={Images.loader_1} />
        </div>
      ) : (
        <>
          {examChartsData.length ? (
            <>
              <LandingSection schoolName={"Liwa International School"} />
              <ABTAssessments />
              <AttainmentSkillsRanges />
              <ReportTable />
              <CombinedGrades />
              <ExamChartsTables Data={examChartsData} />
            </>
          ) : (
            "no such data"
          )}
        </>
      )}
    </div>
  );
}

export default AttainmentReport;
