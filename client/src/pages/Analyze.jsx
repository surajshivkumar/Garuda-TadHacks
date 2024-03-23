import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Analyze = () => {
  const [audioSrc1, setAudioSrc1] = useState(null);
  const [audioSrc2, setAudioSrc2] = useState(null);
  const location = useLocation();


  useEffect(() => {
    if (location.state && location.state.data) {
      const { audioSrc1, audioSrc2 } = location.state.data;
      setAudioSrc1(audioSrc1);
      setAudioSrc2(audioSrc2);
    }
  }, [location.state]);

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
          <p className="h-full p-4 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dignissimos voluptas tenetur magni delectus, consectetur alias vero dolor beatae hic nihil deserunt neque repellendus doloremque sequi id ipsa molestias quibusdam adipisci rerum dicta. Officiis fugit vitae rerum non! Facilis laudantium eum quos repellendus quam iure corporis laborum culpa quasi cum! Harum distinctio nisi corporis sint! Eligendi earum praesentium porro, sapiente doloribus officiis cum quia soluta rem libero pariatur, quidem ea doloremque repellendus? Laborum architecto eum fuga odio veritatis expedita natus, doloribus enim ab, deserunt asperiores facilis nihil iure aliquam cumque ipsa quo aspernatur fugit sunt sapiente voluptate dignissimos. Inventore unde iure ea non assumenda. Architecto voluptate provident ullam vero culpa quos doloribus dolor velit nesciunt, minima id voluptatum doloremque at aliquam repellendus optio similique accusantium quam fuga cum quo expedita eum! Fugit soluta culpa modi ad sint dolorem deserunt non minima sapiente recusandae, sed corporis placeat cupiditate earum temporibus velit perspiciatis at adipisci ipsa sit cumque illo. Officia, rem tempore ad minus excepturi exercitationem consectetur reiciendis sint cupiditate libero! Perferendis numquam ducimus esse facilis impedit quas deleniti sint hic ipsa accusantium neque cum, obcaecati tempora modi, sapiente similique provident. Iure consequuntur voluptate eligendi excepturi asperiores obcaecati? Exercitationem numquam cumque dolorum itaque distinctio laborum omnis ipsa, vel, ratione quod tempore eos molestiae laudantium repellat? Voluptates atque dolorum deserunt quidem illum! Sequi veniam nesciunt explicabo dolore eligendi nihil ab nostrum saepe dolores tempora corporis facilis quisquam reiciendis ducimus odio, suscipit, rerum modi ipsum eum necessitatibus. Magnam quas voluptatem in consequuntur ipsa sit dolorum voluptate aperiam nihil reiciendis officia nisi, commodi mollitia quidem non voluptates totam culpa veniam ex delectus doloribus praesentium quia, facilis ipsum. Reprehenderit accusantium fuga dignissimos pariatur aspernatur, quos corporis blanditiis ipsam necessitatibus vel ab, voluptatem repellat veritatis tempore officia quas accusamus illum. Cumque quia commodi in excepturi quod sint perferendis ab, nihil asperiores, 
          </p>
        </div>
        <div className="scrollable-box w-1/2 m-4 overflow-auto">
          <p className="h-full p-4">
            {/* Your content for the second scrollable box */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
