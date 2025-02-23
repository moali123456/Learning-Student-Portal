import React from "react";

interface AssessmentData {
  month: string;
  below: number;
  inline: number;
  above: number;
  total: number;
}

const assessmentData: AssessmentData = {
  month: "May",
  below: 0,
  inline: 0,
  above: 2,
  total: 2,
};

export default function AssessmentTable() {
  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <table className="w-full border border-gray-200 text-center rounded overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 border">Assessment (Girls)</th>
            <th className="p-2 border bg-red-300">Below</th>
            <th className="p-2 border bg-yellow-300">Inline</th>
            <th className="p-2 border bg-green-300">Above</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">{assessmentData.month}</td>
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
