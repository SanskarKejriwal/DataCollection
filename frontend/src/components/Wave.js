import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import "./Wave.css";

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return `rgb(${r},${g},${b},0.3)`;
}

const Waveform = ({ regionsCreated, setRegionsCreated, keyDetails }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(300);
  // [start, end, content, color

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = {
      container: waveformRef.current,
      waveColor: "black",
      progressColor: "OrangeRed",
      cursorColor: "OrangeRed",
      responsive: true,
      height: 100,
      // If true, normalize by the maximum peak instead of 1.0.
      normalize: true,
      // Use the PeakCache to improve rendering speed of large waveforms.
      partialRender: true,
      plugins: [
        RegionsPlugin.create({
          regions: regionsCreated,
          dragSelection: {
            slop: 5,
          },
        }),
        TimelinePlugin.create({
          container: "#wave-timeline",
          height: 25,
          notchPercentHeight: 50,
          primaryColor: "black",
          secondaryColor: "blue",
          primaryFontColor: "black",
          secondaryFontColor: "black",
          fontSize: 14,
          timeInterval: 0.1,
        }),
      ],
    };
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(keyDetails.url);
    wavesurfer.current.zoom(zoom);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    return () => wavesurfer.current.destroy();
  }, []);

  useEffect(() => {
    wavesurfer.current.on("region-click", function (region, e) {
      e.stopPropagation();
      wavesurfer.current.play(region.start, region.end);
    });

    wavesurfer.current.on("region-created", function (region, e) {
      region.color = randomRgbColor();
      let lastRegion;
      if (regionsCreated.length === 0) {
        lastRegion = 0;
      } else {
        lastRegion =
          regionsCreated[regionsCreated.length - 1].attributes.label.split(
            " "
          )[1] - "0";
      }

      region.attributes = {
        label: "Region " + `${lastRegion + 1}`,
      };
      let temp = [...regionsCreated, region];

      setRegionsCreated(temp);
    });
  }, [regionsCreated]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const handleDelete = (id) => {
    wavesurfer.current.regions.list[id].remove();
    let temp = [...regionsCreated];
    temp = temp.filter((region) => region.id !== id);

    setRegionsCreated(temp);
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };
  const handleZoomChange = (e) => {
    const { target } = e;
    const newZoom = +target.value;

    if (newZoom) {
      setZoom(newZoom);
      wavesurfer.current.zoom(newZoom);
    }
  };

  return (
    <>
      <div className="w-full ">
        <div id="waveform" ref={waveformRef} />
        <div id="wave-timeline" />
        <div className="controls mt-4 flex flex-wrap items-center justify-between">
          <button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-sm w-[6rem] mr-4"
          >
            {!playing ? "Play" : "Pause"}
          </button>
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
            />

            <label htmlFor="volume" className="ml-2 font-bold">
              Volume
            </label>
          </div>
          <div>
            <input
              type="range"
              id="zoom"
              name="zoom"
              min="100"
              max="1000"
              step="20"
              onChange={handleZoomChange}
              defaultValue={zoom}
            />
            <label htmlFor="zoom" className="ml-2 font-bold">
              Zoom
            </label>
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-6">
          {regionsCreated.length > 0 &&
            regionsCreated.map((region, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleDelete(region.id);
                  }}
                  className="flex flex-row cursor-pointer  py-1 px-2 w-[6rem] justify-between items-center mr-2 mb-4 bg-gray-300 text-gray-600 text-sm font-medium rounded-sm"
                >
                  <p>{region.attributes.label}</p>
                  <p>x</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Waveform;
