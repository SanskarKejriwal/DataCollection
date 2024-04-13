
import React from "react";
import LabLogo from "../resources/SpinLab.png"; // Import the JPEG for lab logo
import CollegeLogo from "../resources/IITG_logo.png"; // Import the JPEG for college logo

const ThankYou = () => {
  return (
    <div className="flex flex-col p-12  min-h-full bg-gray-200">
      {/* Flex container for top section */}
      <div className="flex justify-between  items-center mb-8 flex-wrap">
        {/* College Logo on top left */}
        <div className="flex items-center mb-4">
          <img
            src={CollegeLogo}
            alt="College Logo"
            className="h-20 w-auto mr-4"
          />
          <div>
            <div className="font-bold text-gray-800 text-xl md:text-2xl flex flex-wrap">
              Indian Institute of Technology, Guwahati
            </div>
            <div className="text-gray-600 text-sm md:text-base">
              <a href="#" className="hover:text-blue-500">
                IIT Guwahati
              </a>
            </div>
          </div>
        </div>

        {/* Lab Logo on top right */}
        <div className="flex items-center">
          <div>
            <div className="font-bold text-gray-800 text-xl md:text-2xl">
              SPIN LAB
            </div>
            <div className="text-gray-600 text-sm md:text-base">
              <a href="#" className="hover:text-blue-500">
                IIT Guwahati
              </a>
            </div>
          </div>
          <img src={LabLogo} alt="Lab Logo" className="h-20 w-auto ml-4" />
        </div>
      </div>

      {/* Thank you message centered */}
      <div className="text-center w-full flex flex-1 justify-center items-center  text-gray-800 text-lg md:text-xl font-medium">
        Thank you for your contribution. Have a nice day.
      </div>
    </div>
  );
};

export default ThankYou;
