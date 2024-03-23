import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";

function HomeComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setLoading(true);

    // Simulate 2 seconds delay for uploading
    setTimeout(() => {
      setLoading(false);
      setAnalyzing(true);

      // Simulate analyzing and redacting process
      setTimeout(() => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        axios
          .post("http://127.0.0.1:5000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            setAnalyzing(false);
            navigate("/analyze", { state: { data: response.data } }); // Pass data to Analyze component
          })
          .catch((error) => {
            setAnalyzing(false); // Reset analyzing state on error
            console.error(error);
          });
      }, 2000); // Simulate analyzing and redacting process
    }, 2000); // Simulate uploading delay
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-black p-1 rounded-lg mb-4">
        <img src={logo} className="w-1/2 mx-auto" alt="TADHack Logo" />
      </div>
      <p className="description text-center text-lg text-green-500 font-semibold">
        Generate a redacted vcon in seconds...
      </p>
      <div className="flex flex-col items-center">
        <input
          type="file"
          className="border border-gray-300 p-2 rounded-lg mb-4"
          onChange={handleFileChange}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          onClick={handleUpload}
          disabled={!selectedFile || loading || analyzing}
        >
          {loading
            ? "Uploading..."
            : analyzing
            ? "Analyzing and Redacting..."
            : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default HomeComponent;
