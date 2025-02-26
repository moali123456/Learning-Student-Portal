interface AssessmentData {
  type: string;
  title: string;
  below: number;
  inline: number;
  above: number;
  total: number;
}

export default function AssessmentTable({
  assessmentData,
}: {
  assessmentData: AssessmentData;
}) {
  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <table className="w-full border border-gray-200 text-center rounded overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 border">Assessment ({assessmentData.type})</th>
            <th className="p-2 border bg-red-300">Below</th>
            <th className="p-2 border bg-yellow-300">Inline</th>
            <th className="p-2 border bg-green-300">Above</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">{assessmentData.title}</td>
            <td className="p-2 border">{assessmentData.below} Student</td>
            <td className="p-2 border">{assessmentData.inline} Student</td>
            <td className="p-2 border">{assessmentData.above} Student</td>
            <td className="p-2 border font-bold">{assessmentData.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
