import React from "react";
import { Link } from "react-router-dom";
import LabLogo from "../resources/SpinLab.png"; // Import the JPEG for lab logo
import CollegeLogo from "../resources/IITG_logo.png"; // Import the JPEG for college logo
const Home = () => {
  return (
    // <div className="">
    <div className="flex justify-center bg-black  h-[100vh] p-8 w-full border-white border-4">
      <div className="border-blue border-4 flex flex-col lg:flex-row max-w-7xl justify-center items-center p-2 space-y-3 w-full">
        <div className="flex flex-col  text-white md:items-start items-center justify-between  space-y-3 px-8">
          <div className="text-5xl md:text-7xl font-bold ">
            Project Cough Counts{" "}
          </div>
          <div className="text-lg uppercase md:text-1xl   ">
            Welcome to our data collection project focused on creating a
            comprehensive dataset of cough sounds from the Coswara dataset!
          </div>
          <div>
            Our goal is to gather valuable insights into cough patterns,
            frequencies, and characteristics. With your help, we can enhance our
            understanding of respiratory health and contribute to the
            development of innovative solutions. How can you contribute? It's
            simple! By clicking the button below, you'll gain access to our
            platform where you can participate in our data collection efforts.
            You'll be asked to listen to audio files and provide feedback on
            whether coughs are present and, if so, the number of coughs you
            detect. Your contributions play a crucial role in advancing our
            research and improving respiratory healthcare for everyone. Join us
            today and make a difference!
          </div>
          <div className="text-xl md:text-1xl">
            <Link to="/form">
              <button
                type="button"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Contribute
              </button>
            </Link>
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-6 md:m-4">
          <div className="md:w-20 w-10 h-60 md:h-96  overflow-hidden rounded-xl">
            <img
              src={LabLogo}
              className="h-full w-full"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>

    // </div>
  );
};

export default Home;
