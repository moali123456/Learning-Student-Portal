import SchoolLogo from "../images/schoolLogo.png";
import reportData from "../data/report_points.json";
// interface ReportItem {
//   title: string;
//   description: string;
//   icon: string;
// }

export default function ReportTable() {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mb-6">
      <div className="w-full flex justify-center ">
        <img src={SchoolLogo} alt="Benchmark Logo" className="object-cover" />
      </div>
      <h2 className="text-xl font-bold text-teal-600 text-center mb-4">
        In this report, we analyse the below points
      </h2>
      <table className="w-5/6 mx-auto border rounded-[8px] ">
        <tbody className="">
          {reportData.map((item, index) => (
            <tr key={index} className="border-gray-200 border-b ">
              <td className="p-4 text-gray-700 text-start">
                <span className="pe-1 text-teal-600 font-semibold">
                  {item.title}
                </span>
                {item.description}
              </td>
              <td className="p-4 text-2xl border-gray-200 border-l text-center">
                {item.icon}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
