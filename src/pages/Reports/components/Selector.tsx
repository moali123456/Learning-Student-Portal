import { useRef, useState } from "react";

interface SelectorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  loading: boolean; // Add loading prop
}

export default function Selector({
  name,
  value,
  onChange,
  options,
  placeholder,
  loading,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Selected Option - Click to Toggle Dropdown */}
      <div
        ref={dropdownRef}
        role="button"
        tabIndex={0}
        className="w-full p-3 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer focus:ring-2 focus:ring-purple-400 transition flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}

        {/* SVG Arrow with Rotation Animation */}
        <svg
          width="15"
          height="8"
          viewBox="0 0 15 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            d="M7.50065 7.87496L0.208984 0.619751H14.7923L7.50065 7.87496Z"
            fill="#9A7ED9"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-y-auto">
          {loading && (
            <div className="p-3 flex items-center space-x-2 text-gray-500 justify-center">
              <LoadingSpinner />
              <span>Loading...</span>
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              role="button"
              tabIndex={0}
              className={`p-3 hover:bg-purple-500 hover:text-white cursor-pointer transition ${
                value === option.value
                  ? "bg-purple-500 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
  );
}
