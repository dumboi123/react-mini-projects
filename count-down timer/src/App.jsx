//! useEffect
// 1. Cap nhat lai state
// 2. Cap nhat DOM y mutated)
// 3. Render lai UE
// 4. Goi cleanup neu deps thay dôi
// 5. Goi useEffect callback
//! useLayoutEffect
// 1. Câp nhât lai state
// 2. Câp nhat DOM (mutated)
// 3. Goi cleanup neu deps thay doi (sync)
// 4. Goi useLayoutEffect callback (sync)
// 5. Render lai UI

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as Logic from "./Logic";
import Clock from "./Clock";
import Input from "./Input";
import "./App.css";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [toggleClick, setToggleClick] = useState(() => () => {}); // State to store toggleClick function
  
  const prevTime = useRef();


  const timeRef = useRef();

  console.log("App render");
  useLayoutEffect(() => {
    setHours((prev) => Logic.clamp(prev, 0, 24));
    setTime(Logic.convertTime(hours, minutes, seconds));
  }, [hours]);

  useLayoutEffect(() => {
    setMinutes((prev) => Logic.clamp(prev, 0, 60));
    setTime(Logic.convertTime(hours, minutes, seconds));
  }, [minutes]);

  useLayoutEffect(() => {
    setSeconds((prev) => Logic.clamp(prev, 0, 60));
    setTime(Logic.convertTime(hours, minutes, seconds));
  }, [seconds]);

  useLayoutEffect(() => {
    if (time === -1 && time < prevTime.current) {
      window.alert("Time's up!");
      setTime(timeRef.current);
      setIsRunning(false);
      toggleClick();
    }
    prevTime.current = time;
  }, [time]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleIncrement = (setter) => {
    setter((prev) => prev + 1);
  };
  const handleDecrement = (setter) => {
    setter((prev) => prev - 1);
  };

  const handleChange = (setter, condition) => {
    !isRunning &&
      (condition === "increase"
        ? handleIncrement(setter)
        : handleDecrement(setter));
  };

  const handleReset = () => {
    setTime(timeRef.current);
    setIsRunning(false);
    toggleClick();
  };

  const handleStart = () => {
    if (time === 0) {
      window.alert("Time hasn't been set yet");
      return;
    }
    timeRef.current = Logic.convertTime(hours, minutes, seconds);
    setIsRunning(!isRunning);
    toggleClick();
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <div id="pomodoro">
        <Clock
          logic={Logic}
          time={time}
          isRunning={isRunning}
          handleStart={handleStart}
          handlePause={handlePause}
          handleReset={handleReset}
          setToggleClick={setToggleClick}
        />
        <div id="input">
          {/* HOURS */}
          <Input
            id="hours"
            label="Hours"
            value={hours}
            max="24"
            min="0"
            disabled={isRunning}
            onChange={(e) => setHours(e.target.value)}
            onIncrease={() => handleChange(setHours, "increase")}
            onDecrease={() => handleChange(setHours, "decrease")}
          />
          {/* MINUTES */}
          <Input
            id="minutes"
            label="Minutes"
            value={minutes}
            max="60"
            min="0"
            disabled={isRunning}
            onChange={(e) => setMinutes(e.target.value)}
            onIncrease={() => handleChange(setMinutes, "increase")}
            onDecrease={() => handleChange(setMinutes, "decrease")}
          />
          {/* SECONDS */}
          <Input
            id="seconds"
            label="Seconds"
            value={seconds}
            max="60"
            min="0"
            disabled={isRunning}
            onChange={(e) => setSeconds(e.target.value)}
            onIncrease={() => handleChange(setSeconds, "increase")}
            onDecrease={() => handleChange(setSeconds, "decrease")}
          />
        </div>
      </div>
      <div id="audio-selector">
        <div id="forest" className="theme">
          Forest
        </div>
        <div id="ocean" className="theme">
          Ocean
        </div>
        <div id="rainy" className="selected theme">
          Rainy
        </div>
        <div id="peace" className="theme">
          Peace
        </div>
        <div id="cafe" className="theme">
          Caf&eacute;
        </div>
      </div>
      <audio
        loop
        autoPlay={false}
        src="https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/rain.mp3"
      ></audio>
    </>
  );
}

export default App;
