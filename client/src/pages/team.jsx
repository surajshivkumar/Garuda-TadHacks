import React from "react";

function AboutUsPage() {
  return (
    <div>
      <div className="bg-black-900 text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <h3 className="mb-4">Team Garuda</h3>
      </div>

      <h2 className="text-center text-2xl mt-8 mb-4">Our Team</h2>

      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-black shadow-lg p-4">
            <img
              src={require("../images/aksha.png")}
              alt="Jane"
              className="w-full h-auto mb-4"
            />
            <div className="text-center">
              <h2 className="text-lg text-white text-white font-bold mb-2">
                Akshata
              </h2>
              <p className="text-white">salunkhe10@usf.edu</p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-black shadow-lg p-4">
            <img
              src={require("../images/Divya.png")}
              alt="Mike"
              className="w-full h-auto mb-4"
            />
            <div className="text-center">
              <h2 className="text-lg  text-white font-bold mb-2">Divya</h2>
              <p className="text-white">dsakhare@usf.edu</p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-black shadow-lg p-4">
            <img
              src={require("../images/suraj.png")}
              alt="John"
              className="w-fullh-auto  mb-4"
            />
            <div className="text-center">
              <h2 className="text-white text-lg font-bold mb-2">Suraj</h2>
              <p className="text-white">suraj36@usf.edu</p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-black shadow-lg p-4">
            <img
              src={require("../images/tejas.png")}
              alt="John"
              className="w-full h-auto mb-4"
            />
            <div className="text-center">
              <h2 className="text-lg text-white font-bold mb-2">Tejas</h2>
              <p class="text-white">tejassathe@usf.edu</p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-black shadow-lg p-4">
            <img
              src={require("../images/sai.png")}
              alt="Emily"
              className="w-fullh-auto  mb-4"
            />
            <div className="text-center">
              <h2 className="text-lg text-white font-bold mb-2">Nagasai</h2>
              <p className="text-white">nagasai@usf.edu</p>
            </div>
          </div>
        </div>

        {/* Add more team members here */}
      </div>
    </div>
  );
}

export default AboutUsPage;
