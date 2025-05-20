import axios from "axios";
import { useEffect, useState } from "react";

export default function Media() {
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/files");
      setMediaFiles(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching media files:", error);
    }
  };

  const removeFile = async (fileName) => {
    console.log("remove:" + fileName);
    try {
      const res = await axios.delete(`http://localhost:3000/files/${fileName}`);
      if (res.status === 200) {
        setMediaFiles((prevFiles) =>
          prevFiles.filter((file) => file !== fileName)
        );
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  return (
    <>
      <div className="w-2/3 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
        <h3 className="mb-4 border-b border-gray-200">Media Files</h3>

        <div className="grid grid-cols-6">
          {mediaFiles.map((file, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                src={`http://localhost:3000/uploads/${file}`}
                alt={file}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                onClick={() => removeFile(file)} // Fixed: now properly passing a function
                className="bg-red-500 py-1 px-3 rounded text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
