import AttainmentTable from "./AttainmentTable";

export default function AttainmentSkillsRanges() {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mb-6">
      {/* Attainment Ranges Section */}
      <AttainmentTable />
      {/* Skills Ranges Section */}
      <h2 className="text-2xl font-bold text-center mt-6 mb-4">
        Skills Ranges
      </h2>
    </div>
  );
}
