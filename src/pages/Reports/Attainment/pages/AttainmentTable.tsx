import attainmentData from "../data/attainment_ranges_data.json";

// interface GradeRange {
//   grade: string;
//   below: string;
//   inline: string;
//   above: string;
// }
// interface Category {
//     title: string;
//     description: string;
//     range: string;
//   }

export default function AttainmentTable() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Attainment Ranges</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-[14px] text-center border rounded-[8px] overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="bg-white"></th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 bg-red-500 text-white rounded-tl-[8px]"
              >
                Below curriculum standards
              </th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 bg-yellow-400"
              >
                In line with curriculum standards
              </th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 bg-green-500 text-white"
              >
                Above curriculum standards
              </th>
            </tr>
          </thead>
          <tbody>
            {attainmentData.grades.map((gradeRange, index) => (
              <tr key={index}>
                <td>
                  <span className="m-2 p-1 min-w-18 max-w-18 block whitespace-nowrap bg-[#adbacf] text-[#5c636d] font-semibold rounded">
                    {gradeRange.grade}
                  </span>
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 text-red-600"
                >
                  {gradeRange.below}
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 text-yellow-600"
                >
                  {gradeRange.inline}
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 text-green-600"
                >
                  {gradeRange.above}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              {attainmentData.categories.map((category, index) => (
                <td
                  key={index}
                  colSpan={1}
                  className={`border border-gray-300 px-4 py-2 ${
                    index < 2
                      ? "bg-orange-500 text-white"
                      : index < 4
                      ? "bg-gray-400 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {category.title}
                </td>
              ))}
            </tr>
            <tr>
              <td></td>
              {attainmentData.categories.map((category, index) => (
                <td
                  key={index}
                  colSpan={1}
                  className={`border border-gray-300 px-4 py-2 ${
                    index < 2
                      ? `bg-red-600 text-white ${
                          index == 0 && "rounded-bl-[8px]"
                        }`
                      : index < 4
                      ? "bg-gray-500 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {category.description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
