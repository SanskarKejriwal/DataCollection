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

    <div className="relative min-h-screen flex items-center justify-center bg-center bg-black py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">audio</h2>
              {/* <audio controls>
        <source src={"https://coswaraaudiofiles.s3.eu-north-1.amazonaws.com/1.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA47CRYP7TSKZQ5C37%2F20240321%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240321T171305Z&X-Amz-Expires=3600&X-Amz-Signature=f00abbe11dd9c9e3f4dbe89d940ed2bdcb0c13c1424a0460cc7d0e885a996957&X-Amz-SignedHeaders=host&x-id=GetObject"} type="audio/wav" />
        Your browser does not support the audio element.
      </audio> */}
       <Waveform />

            </div>
            <div className="mt-5">
              <div className="form">
                <div className="md:space-y-2 mb-3"></div>
                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      Age
                    </label>
                    <input
                      placeholder="Age"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="number"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      Gender
                    </label>
                    <select
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
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
                </div>

                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
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
                    <label className="font-semibold text-gray-600 py-2">
                      City
                    </label>
                    <input
                      placeholder="City"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                  <label className="font-semibold text-gray-600 py-2">
                    Is Cough Present?
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="coughPresent"
                      value="yes"
                      checked={coughPresent === "yes"} // Set checked attribute based on state
                      onChange={handleCoughPresent} //
                      className="mr-2"
                    />
                    <label htmlFor="yes">Yes</label>
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

                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                  <label className="font-semibold text-gray-600 py-2">
                    Number of Coughs Present
                  </label>
                  <input
                    placeholder="Count"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required="required"
                    type="number"
                    name="coughCount"
                    value={coughCount}
                    onChange={(e) => setCoughCount(e.target.value)}
                  />
                </div>

                <div className="mt-5 text-right md:space-x-3 md:block flex flex-row">
                  <button
                    onClick={handleCancel}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
