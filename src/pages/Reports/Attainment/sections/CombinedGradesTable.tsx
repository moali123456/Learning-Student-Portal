import tableData from "../data/combine_grads_data.json";

export default function CombinedGradesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center rounded-[8px] overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            {tableData[0].grades.map((grade) => (
              <th key={grade.label} className={`p-2 border`}>
                {grade.label}
              </th>
            ))}
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr
              key={row.category}
              className={`$ {
                  row.category === "Below"
                    ? "bg-red-200"
                    : row.category === "Inline"
                    ? "bg-yellow-200"
                    : "bg-green-200"
                }`}
            >
              <td className={row.bgColor + ` p-2 border font-bold`}>
                {row.category}
              </td>
              {row.grades.map((grade) => (
                <td key={grade.label} className="p-2 border">
                  {grade.students} Student
                  <br />
                  <span className="text-xs text-gray-600">
                    {grade.percentage}%
                  </span>
                </td>
              ))}
              <td className="p-2 border font-bold">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
