import React from "react";

interface ExamHeaderProps {
  title: string;
  questionsCount: number;
  instructions: string;
  duration: string;
  image: string;
  options: { label: string; icon: JSX.Element }[];
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  questionsCount,
  instructions,
  duration,
  image,
  options,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white shadow-lg rounded-lg">
      {/* Text Section */}
      <div className="text-right md:w-1/2 space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul className="text-gray-600">
          <li>عدد الأسئلة: {questionsCount} سؤال</li>
          <li>{instructions}</li>
          <li>مدة الامتحان: {duration}</li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img src={image} alt={title} className="w-48 h-auto" />
      </div>

      {/* Options */}
      <div className="flex flex-col space-y-2 mt-4 md:mt-0">
        {options.map((option, index) => (
          <button
            key={index}
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamHeader;
