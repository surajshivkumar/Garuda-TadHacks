import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Analyze = () => {
  const [audioSrc1, setAudioSrc1] = useState(null);
  const [audioSrc2, setAudioSrc2] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/analyze');
        const data = await response.json();
        console.log(data);
        setText1(data.dialog[0].content);
        setText2(data.dialog[1].content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (audioSrc) => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.setAttribute("download", "audio.mp3");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col bg-black h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex mt-3">
            <audio
              id="audioPlayer1"
              src={audioSrc1}
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
              src={audioSrc2}
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
              <p className="h-full p-4">{text2}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analyze;
