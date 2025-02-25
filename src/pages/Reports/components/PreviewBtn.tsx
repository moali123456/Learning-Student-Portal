import { useState } from "react";
import PreviewModal from "./PreviewModal";

interface PreviewBtnProps {
  fileName: string;
  content: JSX.Element;
  // apiCall: (fileName: string) => Promise<string>; // Fetch preview content
}

export default function PreviewBtn({ fileName, content }: PreviewBtnProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<JSX.Element | null>(
    null
  );

  const openModal = async () => {
    setLoading(true);
    try {
      //   const content = await apiCall(fileName); // Fetch preview content
      setPreviewContent(content);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching file preview:", error);
      alert("Failed to load preview.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewContent(null);
  };

  return (
    <div className="flex justify-between items-center w-full rounded overflow-hidden">
      <div className="w-[60%] px-4 py-3 bg-purple-500 text-white rounded font-semibold">
        {fileName}
      </div>

      <div
        onClick={openModal}
        className={`w-[35%] py-3 flex justify-center font-semibold text-white rounded transition cursor-pointer bg-blue-600 hover:bg-blue-700`}
      >
        {loading ? "Loading..." : "Preview Report"}
      </div>

      <PreviewModal
        isOpen={isModalOpen}
        content={previewContent}
        onClose={closeModal}
      />
    </div>
  );
}
