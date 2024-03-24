import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Analyze = () => {
  const [audioSrc1, setAudioSrc1] = useState(null);
  const [audioSrc2, setAudioSrc2] = useState(null);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Transcribing audio...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMessage("Transcribing audio...");
        const response = await fetch("http://127.0.0.1:5000/analyze");
        const data = await response.json();
        console.log(data);
        setText1(data["analysis"]["transcriptions"][0]["text"]);
        setText2(data["analysis"]["redaction"]);
        setLoading(false); // Update loading state to false after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Update loading state to false in case of error
      }
    };

    const loadingMessages = [
      "Transcribing audio...",
      "Identifying personnel information...",
      "Redacting...",
      "Generating output...",
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      setLoadingMessage(loadingMessages[currentIndex]);
      currentIndex = (currentIndex + 1) % loadingMessages.length;
    }, 3000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  const handleDownload = (audioSrc) => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.setAttribute("download", "audio.mp3");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTextWithHighlights = (text) => {
    // Splitting the text by "<Redacted>" and creating elements
    const parts = text.split(/<Redacted>/gi);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <span
            style={{
              backgroundColor: "green",
              color: "black",
              padding: "2px 4px",
              borderRadius: "4px",
            }}
          >
            REDACTED
          </span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col bg-black h-screen">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <FontAwesomeIcon
            icon={faSpinner}
            className="fa-spin text-white text-4xl mb-4" // Adjust text size (text-4xl) and margin (mb-4) as needed
          />
          <p className="text-center text-white">{loadingMessage}</p>
        </div>
      ) : (
        <>
          <div className="flex mt-3">
            <audio
              id="audioPlayer1"
              src={"http://127.0.0.1:5000/uploads/a.mp3"}
              controls
              className="w-2/4 m-3 overflow-auto"
            />
            <button
              onClick={() => handleDownload(audioSrc1)}
              className="m-4 py-1 px-2 bg-white text-[#34D399] rounded hover:text-white  hover:bg-[#34D399]"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
            <audio
              id="audioPlayer2"
              src={"http://127.0.0.1:5000/uploads/redacted.mp3"}
              controls
              className="w-2/4 m-3 overflow-auto"
            />
            <button
              onClick={() => handleDownload(audioSrc2)}
              className="m-4 py-1 px-2 bg-white text-[#34D399] rounded hover:text-white hover:bg-[#34D399]"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
          <div className="flex mt-3">
            <div className="scrollable-box w-1/2 m-4 overflow-auto">
              <p className="h-full p-4 text-white">{text1}</p>
            </div>
            <div className="scrollable-box w-1/2 m-4 overflow-auto">
              <p className="h-full p-4 text-white">
                {renderTextWithHighlights(text2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analyze;
