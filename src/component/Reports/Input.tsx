import { useEffect, useState } from "react";

interface InputProps {
  name: string;
  value: string;
  placeholder: string;
  delay?: number;
  onChange: (value: string) => void;
}

export default function Input({
  name,
  value,
  placeholder,
  delay = 300,
  onChange,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, delay);
    return () => clearTimeout(timer); // Cleanup function to prevent multiple triggers
  }, [inputValue]);

  return (
    <input
      type="text"
      name={name}
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
    />
  );
}
