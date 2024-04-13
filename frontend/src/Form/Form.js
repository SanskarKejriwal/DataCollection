import React, { useState, useEffect } from "react";
import Waveform from "../components/Wave";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoInformationCircleOutline } from "react-icons/io5";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("20-29");
  const [gender, setGender] = useState("Male");
  const [noise, setNoise] = useState("Clean");
  const [coughCount, setCoughCount] = useState();
  const [isCoughPresent, setCoughPresent] = useState(""); // Initialize state for the selected radio button
  const [regionsCreated, setRegionsCreated] = useState([]);
  const [keyDetails, setKeyDetails] = useState({});
  const [loadUrl, setLoadUrl] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/contribute", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            mode: "no-cors",
          },
        });
        setKeyDetails(response.data);
      } catch (error) {
        setLoadUrl(true);
      }
    };
    fetchData();
  }, []);

  const handleCoughPresent = (event) => {
    setCoughPresent(event.target.value); // Update the state when a radio button is selected
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleNoise = (event) => {
    setNoise(event.target.value);
  };
  const handleSubmit = async (e, action = "next") => {
    e.preventDefault();

    console.log("keyDetails", keyDetails);
    let data = {
      keyDetails: {
        _id: keyDetails.audio._id,
        audioID: keyDetails.audio.validKey,
      },
      audioDetails: {
        audioID: keyDetails.audio.validKey,
        userList: [
          {
            name,
            age,
            noise,
            gender,
            isCoughPresent,
            coughCount,
            timeStamps: [],
          },
        ],
      },
    };

    if (regionsCreated.length > 0) {
      regionsCreated.forEach((region) => {
        data.audioDetails.userList[0].timeStamps.push({
          startTime: region.start,
          endTime: region.end,
        });
      });
    }

    console.log("data", data);
    try {
      const response = await axios.put("http://localhost:5001/submit", data);
      console.log("response", response);
      if (action === "next") {
        console.log("next");
        // navigate("/form");
        window.location.reload();
      } else if (action === "exit") {
        navigate("/thank-you");
      }
    } catch (error) {
      console.log(error);
      window.alert("Error Occured");
    }
  };

  const handleCancel = (e) => {
    setName("");
    setAge(0);
    setNoise("Clean");
    setGender("Male");
    setCoughCount(0);
    setCoughPresent("");
  };

  const handleGuidelinesOpen = () => {
    setOpen(true);
  };
  const handleGuidelinesClose = () => {
    setOpen(false);
  };

  return (
    <>
      {keyDetails && keyDetails.url && (
        <div
          className="relative min-h-screen  flex items-center justify-center bg-center bg-black py-[4rem] px-[1.5rem] min-[500px]:px-[4rem] sm:px-[6rem] 
      md:px[10rem] "
        >
          <div className="w-[100%] h-[100%]  p-2 bg-white rounded-xl shadow-lg z-10 ">
            <div className="flex flex-col h-full p-4 w-full  ">
              <div className="flex flex-col w-full  items-center">
                <div className="font-semibold text-lg mr-auto  flex items-center flex-wrap mb-4">
                  <div className="mr-4 flex items-center "> Audio </div>
                  <div onClick={handleGuidelinesOpen}>
                    <IoInformationCircleOutline />
                  </div>
                </div>

                <Waveform
                  keyDetails={keyDetails}
                  regionsCreated={regionsCreated}
                  setRegionsCreated={setRegionsCreated}
                />

                {}
              </div>
              <form onSubmit={(e) => handleSubmit(e, "next")}>
                <div className="mt-6 form ">
                  <div className="flex  flex-row  w-full text-xs flex-wrap">
                    <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Name
                      </label>
                      <input
                        placeholder="Name"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 px-4"
                        type="text"
                        name="name"
                        value={name}
                        required="true"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className=" relative min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2 text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Predicted Age
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none  block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 pl-4 pr-10"
                          name="Age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required="true"
                          // size="4"
                        >
                          <option value="20-29">20-29</option>
                          <option value="30-39">30-39</option>
                          <option value="40-49">40-49</option>
                          <option value="50-59">50-59</option>
                          <option value="60-69">60-69</option>
                          <option value="> 70"> &ge; 70</option>
                          
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-2.5 h-2.5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            aria-hidden="true"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2 text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Predicted Gender
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 pl-4 pr-10"
                          name="gender"
                          value={gender}
                          onChange={handleGender}
                          required="true"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-2.5 h-2.5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            aria-hidden="true"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2 text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Noise
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-700 rounded-lg h-10 pl-4 pr-10"
                          name="noise"
                          value={noise}
                          onChange={handleNoise}
                          required="true"
                        >
                          <option value="Clean">Clean</option>
                          <option value="Noisy">Noisy</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-2.5 h-2.5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            aria-hidden="true"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex  flex-row  w-full text-xs flex-wrap">
                    <div className="min-[900px]:w-[25%] min-[450px]:w-[50%] w-[100%] space-y-2  text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Is Cough Present?
                      </label>
                      <div className="flex items-center ">
                        <input
                          type="radio"
                          id="isCoughPresent"
                          value="yes"
                          name="isCoughPresent"
                          checked={isCoughPresent === "yes"} // Set checked attribute based on state
                          onChange={handleCoughPresent} //
                          className="mr-2"
                          required="true"
                        />
                        <label htmlFor="yes" className="mr-8">
                          Yes
                        </label>
                        <input
                          type="radio"
                          id="isCoughPresent"
                          required="true"
                          name="isCoughPresent"
                          checked={isCoughPresent === "no"} // Set checked attribute based on state
                          onChange={handleCoughPresent}
                          value="no"
                          className="mr-2"
                        />
                        <label htmlFor="no" className="mr-8">
                          No
                        </label>
                      </div>
                    </div>

                    <div className="min-[900px]:w-[75%] min-[450px]:w-[50%] w-[100%] space-y-2   text-xs p-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Number of Coughs Present
                      </label>
                      <input
                        placeholder="Count"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border  border-gray-700 rounded-lg h-10 px-4"
                        type="number"
                        name="coughCount"
                        value={coughCount}
                        required={isCoughPresent === "yes" ? true : false}
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
                      // onClick={(e) => handleSubmit(e, "next")}
                      type="submit"
                      className="mb-2 min-[377px]:mr-4 md:mb-0 w-[8rem] bg-blue-500 hover:bg-blue-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg "
                    >
                      Next
                    </button>
                    <button
                      onClick={(e) => handleSubmit(e, "exit")}
                      className="mb-2 md:mb-0 w-[8rem] bg-red-500 hover:bg-red-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg"
                    >
                      Exit
                    </button>

                    <BootstrapDialog
                      onClose={handleGuidelinesClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Guidelines
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleGuidelinesClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        x
                      </IconButton>
                      <DialogContent dividers>
                        {/* <Typography gutterBottom> */}
                        <div className="flex flex-col flex-wrap">
                          <div className="flex flex-col flex-wrap">
                            1. Hear the audio signal by pressing the Play
                            button.
                          </div>
                          <div className="flex flex-col flex-wrap">
                            {" "}
                            2. You can adjust the loudness by using the shown
                            volume slider.
                          </div>{" "}
                          <div className="flex flex-col flex-wrap">
                            3. Select all the cough regions by mouse to select a
                            region. Make sure you use the zoom option to get a
                            good time resolution during selection.
                          </div>
                          <div className="flex flex-col flex-wrap">
                            4. You can also verify that the region is selected
                            correctly by playing it.
                          </div>{" "}
                          <div className="flex flex-col flex-wrap">
                            5. Fill your name in the field provided.
                          </div>{" "}
                          <div className="flex flex-col flex-wrap">
                            6. Fill a reasonable guess for the age and gender
                            for the person whose audio is present.{" "}
                          </div>
                          <div className="flex flex-col flex-wrap">
                            7. Fill a label for noise present in the audio.{" "}
                          </div>
                          <div className="flex flex-col flex-wrap">
                            8. Press Next to continue the above task on a new
                            recording or Exit to go to the thank you page.
                          </div>
                        </div>
                        {/* </Typography> */}
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </BootstrapDialog>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {loadUrl && (
        <>
          <div className="h-full flex justify-center items-center">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="flex flex-wrap mb-4 text-2xl">
                Error Occured or no audio available
              </div>
              <button
                onClick={() => navigate("/thank-you")}
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-md shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
