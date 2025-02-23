import { Combine } from "lucide-react";
import ABTAssessments from "./pages/ABTAssessments";
import AttainmentSkillsRanges from "./pages/AttainmentSkillsRanges";
import LandingSection from "./pages/LandingSection";
import ReportTable from "./pages/ReportTable";
import CombinedGrades from "./pages/CombinedGrades";

function AttainmentReport({ x }) {
  return (
    <div
      className="flex flex-col items-center p-4 bg-gray-100 min-h-screen"
      ref={x}
    >
      <LandingSection schoolName={"Liwa International School"} />
      <ABTAssessments />
      <AttainmentSkillsRanges />
      <ReportTable />
      <CombinedGrades />
    </div>
  );
}

export default AttainmentReport;
