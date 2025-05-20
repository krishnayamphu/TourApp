import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.message);
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Error uploading file.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>

          {uploadStatus && <p>{uploadStatus}</p>}
        </form>
      </div>
    </>
  );
}
