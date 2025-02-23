import { useRef } from "react";
import AttainmentReport from "../Attainment/AttainmentReport";

interface PreviewModalProps {
  isOpen: boolean;
  content: string | null;
  onClose: () => void;
}

export default function PreviewModal({
  isOpen,
  content,
  onClose,
}: PreviewModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    console.log("ref={contentRef}", contentRef);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full h-[98%] max-w-6xl flex flex-col justify-between ">
        <div className="text-lg font-semibold mb-4">Preview Report</div>

        {/* Content Preview */}
        <div
          className="border p-4 h-[83%] overflow-auto bg-gray-100 text-sm rounded"
          ref={contentRef}
        >
          <AttainmentReport x={contentRef} />
        </div>

        <div className="h-[8%] flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
