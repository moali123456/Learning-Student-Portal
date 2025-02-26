interface YearSelectorProps {
    selectedYear: string;
    onSelectYear: (year: string) => void;
  }
  
  export default function YearSelector({ selectedYear, onSelectYear }: YearSelectorProps) {
    const years = ["All", "2023", "2024", "2025"];
  
    return (
      <div className="flex space-x-3 mb-4">
        {years.map((year) => (
          <div
            key={year}
            role="button"
            tabIndex={0}
            aria-selected={selectedYear === year}
            className={`w-20 h-20 flex justify-center items-center rounded-full text-sm font-medium cursor-pointer transition
              ${selectedYear === year ? "bg-purple-500 text-white shadow-md" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}
            `}
            onClick={() => onSelectYear(year)}
            onKeyDown={(e) => e.key === "Enter" && onSelectYear(year)}
          >
            {year}
          </div>
        ))}
      </div>
    );
  }
  