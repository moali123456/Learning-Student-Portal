import ABTAssessments from "./pages/ABTAssessments";
import AttainmentSkillsRanges from "./pages/AttainmentSkillsRanges";
import CombinedGrades from "./pages/CombinedGrades";
import LandingSection from "./pages/LandingSection";
import ReportTable from "./pages/ReportTable";

function AttainmentReport() {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <LandingSection schoolName={"Liwa International School"} />
      <ABTAssessments />
      <AttainmentSkillsRanges />
      <ReportTable />
      <CombinedGrades />
    </div>
  );
}

export default AttainmentReport;
