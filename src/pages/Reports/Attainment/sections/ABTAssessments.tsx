import { useEffect, useState } from "react";
import assessmentsData from "../data/abt_assessments_data.json";

interface AssessmentPoint {
  highlight: string;
  text: string;
}

interface AssessmentData {
  title: string;
  description: string;
  points: AssessmentPoint[];
  footer: string;
}

function ABTAssessments() {
  const [data, setData] = useState<AssessmentData | null>(null);

  useEffect(() => {
    setData(assessmentsData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mb-6">
      <h1 className="text-2xl font-bold text-orange-600 text-center mb-4">
        {data.title}
      </h1>
      <p className="text-gray-800 mb-4">{data.description}</p>
      <ul className="list-disc pl-6">
        {data.points.map((point, index) => (
          <li key={index} className="mb-2">
            <strong className="text-teal-600">{point.highlight}:</strong>{" "}
            {point.text}
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold text-orange-600 text-center mt-6">
        {data.footer}
      </p>
    </div>
  );
}

export default ABTAssessments;
