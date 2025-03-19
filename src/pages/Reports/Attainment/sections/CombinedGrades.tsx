import CombinedGradesTable from "./CombinedGradesTable";

export default function CombinedGrades() {
  return (
    <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
      <div className="inline-block text-lg font-bold text-center bg-[#3ca5a8] text-white p-3 rounded mb-2">
        The Combined Grades 3 to 5 / Year 4 to 6 for Non-Arabs
      </div>
      <p className="text-center text-sm text-[#3ca5a8] mb-4">
        The summary of the results based on the years of learning Arabic
      </p>
      <CombinedGradesTable />
    </div>
  );
}
