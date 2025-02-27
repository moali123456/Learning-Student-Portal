import { useState } from "react";

interface ReportDownloadProps {
  type: "pdf" | "excel";
  fileName: string;
  apiCall: (fileName: string) => Promise<void>; // API function passed as a pro
}

export default function ReportDownload({
  type,
  fileName = "report file",
  apiCall,
}: ReportDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await apiCall(fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* <div className="flex justify-between items-center w-full rounded overflow-hidden"> */}
      {/* Report File Label */}
      {/* <div className="w-[60%] px-4 py-3 bg-purple-500 text-white rounded font-semibold">
        {fileName}
      </div> */}

      {/* Download Button */}
      <div
        onClick={!loading ? handleDownload : undefined}
        className={`p-3 flex justify-center font-semibold text-white rounded transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-wait"
            : type === "pdf"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 mr-2 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Downloading...
          </>
        ) : (
          "Download"
        )}
      </div>
    </div>
  );
}
