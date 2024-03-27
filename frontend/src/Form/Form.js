import React, { useState, useEffect, useRef } from "react";
import Waveform from "../components/Wave";
const Form = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [coughCount, setCoughCount] = useState(0);
  const [coughPresent, setCoughPresent] = useState(""); // Initialize state for the selected radio button

  const handleCoughPresent = (event) => {
    setCoughPresent(event.target.value); // Update the state when a radio button is selected
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    console.log(coughPresent);
    console.log(coughCount);
    console.log(age);
    console.log(gender);
    console.log(country);
    console.log(city);
  };

  const handleCancel = (e) => {
    setAge(0);
    setGender("Male");
    setCountry("");
    setCity("");
    setCoughCount(0);
    setCoughPresent("");
  };

  return (
    // <div>

    <div
      className="relative min-h-screen  flex items-center justify-center bg-center bg-black py-[4rem] px-[1.5rem] min-[500px]:px-[4rem] sm:px-[6rem] 
    md:px[10rem]  border-white border-4"
    >
      <div className="w-[100%] h-[100%]  p-2 bg-white rounded-xl shadow-lg z-10 ">
        <div className="flex flex-col h-full p-4 w-full  ">
          <div className="flex flex-col w-full  items-center">
            <div className="font-semibold text-lg mr-auto  flex flex-wrap mb-4">
              Audio
            </div>

            <Waveform />

            {}
          </div>
          <div className="mt-6 form ">
            <div className="flex  flex-row  w-full text-xs flex-wrap">
              <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">Age</label>
                <input
                  placeholder="Age"
                  className="appearance-none  block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 px-4"
                  required="required"
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">
                  Gender
                </label>
                <select
                  className="appearance-none  block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 px-4"
                  required="required"
                  name="gender"
                  value={gender}
                  onChange={handleGender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2  text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">
                  Country
                </label>
                <input
                  placeholder="Country"
                  className="appearance-none  block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 px-4"
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">City</label>
                <input
                  placeholder="City"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 px-4"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex md:flex-row md:space-x-4 w-full text-xs">
              <div className="w-full flex flex-col mb-3">
                <label className="font-semibold text-gray-600 py-2">
                  Country
                </label>
                <input
                  placeholder="Country"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col mb-3">
                <label className="font-semibold text-gray-600 py-2">City</label>
                <input
                  placeholder="City"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div> */}

            <div className="flex  flex-row  w-full text-xs flex-wrap">
              <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2  text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">
                  Is Cough Present?
                </label>
                <div className="flex items-center ">
                  <input
                    type="radio"
                    id="coughPresent"
                    value="yes"
                    checked={coughPresent === "yes"} // Set checked attribute based on state
                    onChange={handleCoughPresent} //
                    className="mr-2"
                  />
                  <label htmlFor="yes" className="mr-8">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="coughPresent"
                    checked={coughPresent === "no"} // Set checked attribute based on state
                    onChange={handleCoughPresent}
                    value="no"
                    className="mr-2"
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>

              <div className="min-[900px]:w-[75%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                <label className="font-semibold text-gray-600 py-2">
                  Number of Coughs Present
                </label>
                <input
                  placeholder="Count"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border  border-gray-700 rounded-lg h-10 px-4"
                  required="required"
                  type="number"
                  name="coughCount"
                  value={coughCount}
                  onChange={(e) => setCoughCount(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5  max-[377px]:items-center max-[377px]:justify-center max-[377px]:flex-col flex flex-row ">
              <button
                onClick={handleCancel}
                className="mb-2 min-[377px]:mr-4 md:mb-0 w-[8rem] bg-gray-300 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-400"
              >
                {" "}
                Cancel{" "}
              </button>
              <button
                onClick={handleSubmit}
                className="mb-2 md:mb-0 w-[8rem] bg-blue-500 hover:bg-blue-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
