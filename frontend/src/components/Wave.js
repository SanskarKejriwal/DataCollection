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

const Waveform = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [regionsCreated, setRegionsCreated] = useState([]); // [start, end, content, color

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = {
      container: waveformRef.current,
      waveColor: "black",
      progressColor: "OrangeRed",
      cursorColor: "OrangeRed",
      barWidth: 4,
      barRadius: 4,
      responsive: true,
      height: 150,
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
          height: 50,
          notchPercentHeight: 50,
          primaryColor: "black",
          secondaryColor: "blue",
          primaryFontColor: "black",
          secondaryFontColor: "black",
          fontSize:15,
        })
      ],
    };
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(
      "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3"
    );
   
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

    

    console.log(wavesurfer.current);
    console.log("wave regions", wavesurfer.current.regions);

    return () => wavesurfer.current.destroy();
  }, []);

  useEffect(() => {
    wavesurfer.current.on("region-click", function (region, e) {
      console.log("region-click", region);
      e.stopPropagation();
      wavesurfer.current.play(region.start, region.end);
    });
    wavesurfer.current.on("region-dblclick", function (region, e) {
      console.log("region-dblclick", region);
    });
    wavesurfer.current.on("region-mouseleave", function (region, e) {
      console.log("region-mouseleave", region);
    });
    wavesurfer.current.on("region-mouseenter", function (region, e) {
      console.log("region-mouseenter", region);
    });
    wavesurfer.current.on("region-created", function (region, e) {
      console.log("region-created", region);
      console.log(regionsCreated);
      region.color = randomRgbColor();
      region.attributes = {
        label: "Region",
      };
      region.content = "Region";
      let temp = [...regionsCreated, region];

      console.log("temp", temp);
      setRegionsCreated(temp);
    });
  }, [regionsCreated]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const handleDelete = () => {
    wavesurfer.current.clearRegions();
    setRegionsCreated([]);
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  console.log("regions", regionsCreated);

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div id="wave-timeline"/>
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <button onClick={handleDelete}>Delete</button>
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
        
        <label htmlFor="volume">Volume</label>
      </div>
      {regionsCreated &&
        regionsCreated.map((region, index) => {
          return (
            <div key={index}>
              <p>Region {index + 1}</p>
              <p>Start: {region.start}</p>
              <p>End: {region.end}</p>
              <p>Content: {region.content}</p>
              <p>Color: {region.color}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Waveform;