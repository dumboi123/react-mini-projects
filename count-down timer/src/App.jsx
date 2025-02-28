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
import "./App.css";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [time, setTime] = useState(0);
  const [timeSetted, setTimeSetted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const prevTime = useRef();

  const firstTimeRef = useRef(true);

  const startRef = useRef();
  const pauseRef = useRef();
  const resetRef = useRef();
  const timeRef = useRef();

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

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  useLayoutEffect(() => {
    if (time === 0 && time < prevTime.current) {
      setIsRunning(false);
      toggleClick();
    }
    prevTime.current = time;
    console.log(`time ${time}`);
    console.log(`prevTime ${prevTime.current}`);
  }, [time]);

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

  const handleInput = (e) => {
    if (e.target.value.length === 3 && e.target.value.startsWith("0")) {
      e.target.value = e.target.value.slice(1, 3);
    }
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

  const toggleClick = () => {
    if (startRef.current.style.display === "none") {
      startRef.current.style.display = "block";
      pauseRef.current.style.display = "none";
      resetRef.current.style.display = "none";
    } else {
      startRef.current.style.display = "none";
      pauseRef.current.style.display = "block";
      resetRef.current.style.display = "block";
    }
  };

  return (
    <>
      <div id="pomodoro">
        <div id="clock">
          <div id="timer">
            <div id="title">Ready?</div>
            <div id="countdown">
              <span id="time">{Logic.formatTime(time)}</span>
            </div>
            <div id="controls" className="reset">
              <div id="start" ref={startRef} onClick={handleStart}>
                <i className="bi bi-play-fill"></i> Start
              </div>
              <div id="pause" ref={pauseRef} onClick={handlePause}>
                <i
                  className={isRunning ? "bi bi-pause-fill" : "bi bi-play-fill"}
                ></i>
                {isRunning ? "Pause" : "Continue"}
              </div>
              <div id="reset" ref={resetRef} onClick={handleReset}>
                <i className="bi bi-arrow-clockwise"></i> Reset
              </div>
            </div>
          </div>
        </div>
        <div id="input">
          {/* HOURS */}
          <div id="hours">
            <i
              className="bi bi-chevron-double-up"
              onClick={() => handleChange(setHours, "increase")}
            ></i>
            <span className="option-title">Hours</span>
            <input
              type="number"
              value={hours}
              max="24"
              min="0"
              onChange={(e) => setHours(e.target.value)}
              onInput={(e) => handleInput(e)}
            />
            <i
              className="bi bi-chevron-double-down"
              onClick={() => handleChange(setHours, "decrease")}
            ></i>
          </div>
          {/* MINUTES */}
          <div id="minutes">
            <i
              className="bi bi-chevron-double-up"
              onClick={() => handleChange(setMinutes, "increase")}
            ></i>
            <span className="option-title">Minutes</span>
            <input
              type="number"
              value={minutes}
              max="60"
              min="0"
              onChange={(e) => setMinutes(e.target.value)}
              onInput={(e) => handleInput(e)}
            />
            <i
              className="bi bi-chevron-double-down"
              onClick={() => handleChange(setMinutes, "decrease")}
            ></i>
          </div>
          {/* SECONDS */}
          <div id="seconds">
            <i
              className="bi bi-chevron-double-up"
              onClick={() => handleChange(setSeconds, "increase")}
            ></i>
            <span className="option-title">Seconds</span>
            <input
              type="number"
              value={seconds}
              max="60"
              min="0"
              onChange={(e) => setSeconds(e.target.value)}
              onInput={(e) => handleInput(e)}
            />
            <i
              className="bi bi-chevron-double-down"
              onClick={() => handleChange(setSeconds, "decrease")}
            ></i>
          </div>
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
