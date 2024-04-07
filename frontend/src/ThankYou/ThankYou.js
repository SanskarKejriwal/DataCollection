// import React from "react";

// const ThankYou = () => {
//   return (
//     <div>
//       <div class="flex justify-center ">
//         <div class="flex flex-col justify-center items-center">
//           <div class="flex flex-col md:flex-row max-w-7xl justify-center items-center ">
//             <div class="overflow-hidden w-2/3 m-4 flex justify-center ">
//               <div class="flex  items-center justify-center  ">
//                 <div class="  items-center justify-center flex flex-col lg:flex-row ">
//                   <div class="flex items-center justify-around h-60  w-full lg:text-left text-center ">
//                     <div class="flex flex-col md:flex-row items-center  ">
//                       <img
//                         src=""
//                         alt=""
//                         class="rounded-full"
//                       />
//                       <div>
//                         <div class="font-bold text-gray-600 mx-4">SPIN LAB</div>
//                         <div class="text-sm font-medium text-gray-500 hover:text-stone-500 mx-4">
//                           <a href="#">IIT Guwahati</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="text-gray-600 text-xl font-medium lg:text-left text-center ">
//                     {" "}
//                     Thank you for your contribution. Have a nice day.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYou;
import React from "react";
import LabLogo from "../resources/SpinLab.png"; // Import the JPEG for lab logo
import CollegeLogo from "../resources/IITG_logo.png"; // Import the JPEG for college logo

const ThankYou = () => {
  return (
    <div className="flex border-4 border-blue-700 h-full bg-gray-200">
      <div className="p-4 w-full h-full border-4 border-black">
        {/* Flex container for top section */}
        <div className="flex justify-between border-4 border-pink-700 items-center mb-8 flex-wrap">
          {/* College Logo on top left */}
          <div className="flex items-center mb-4">
            <img
              src={CollegeLogo}
              alt="College Logo"
              className="h-20 w-auto mr-4"
            />
            <div>
              <div className="font-bold text-gray-800 text-xl md:text-2xl">
                Indian Institute of Technology, Guwahati
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                <a href="#" className="hover:text-blue-500">
                  IITG
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
            <img
              src={LabLogo}
              alt="Lab Logo"
              className="h-20 w-auto ml-4"
            />
          </div>
        </div>

        {/* Thank you message centered */}
      <div className="text-center w-full min-h-screen max-h-screen border-4 border-green-700 text-gray-800 text-lg md:text-xl font-medium">
          Thank you for your contribution. Have a nice day.
        </div>
      </div>
      
    </div>
  );
};

export default ThankYou;