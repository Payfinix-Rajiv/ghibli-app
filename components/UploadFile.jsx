import { useState } from "react";
import { Upload } from "lucide-react";

export default function UploadFile({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-xl font-bold mb-4">Upload Your Image</h2>

      <label
        htmlFor="fileUpload"
        className="cursor-pointer border-dashed border-2 border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 transition"
      >
        <Upload className="w-10 h-10 text-gray-500" />
        <span className="mt-2 text-gray-600">
          {fileName || "Click to Browse or Drag & Drop"}
        </span>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md">
          Upload
        </button>
      )}
    </div>
  );
}
