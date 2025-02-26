import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const prevTime = useRef();

  const startRef = useRef();
  const pauseRef = useRef();
  const resetRef = useRef();
  // console.log(`re-render time ${time}`);
  useLayoutEffect(() => {
    setHours((prev) => clamp(prev, 0, 24));
  }, [hours]);

  useLayoutEffect(() => {
    setMinutes((prev) => clamp(prev, 0, 60));
  }, [minutes]);

  useLayoutEffect(() => {
    setSeconds((prev) => clamp(prev, 0, 60));
  }, [seconds]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    prevTime.current = time;
  }, [time]);

  const convertTime = (hoursInput, minutesInput, secondsInput) => {
    const hoursToSeconds = hoursInput * 3600;
    const minutesToSeconds = minutesInput * 60;
    const totalSeconds = hoursToSeconds + minutesToSeconds + secondsInput;
    return totalSeconds;
  }
  
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const handleInput = (e) => {
    if (e.target.value.length === 3 && e.target.value.startsWith("0")) {
      e.target.value = e.target.value.slice(1, 3);
    }
  };

  const handleReset = () => {
    setTime(20);
    setIsRunning(!isRunning);
    handleStart();
  };

  const handleStart = () => {
    if (time === 0) {
      window.alert("Time hasn't been set yet");
      return;
    }
    toggleClick();
    setIsRunning(!isRunning);
  };

  const handlePause = () => {
    if (time === 0) {
      setIsRunning(true);
      return;
    }
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
              <span id="time">{formatTime(time)}</span>
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
          <div id="hours">
            <i className="bi bi-chevron-double-up"></i>
            <span className="option-title">Hours</span>
            <input
              type="number"
              value={hours}
              max="24"
              min="0"
              onChange={(e) => setHours(e.target.value)}
              onInput={(e) => handleInput(e) }
            />
            <i className="bi bi-chevron-double-down"></i>
          </div>
          <div id="minutes">
            <i className="bi bi-chevron-double-up"></i>
            <span className="option-title">Minutes</span>
            <input
              type="number"
              value={minutes}
              max="60"
              min="0"
              onChange={(e) => setMinutes(e.target.value)}
              onInput={(e) => handleInput(e)}
            />
            <i className="bi bi-chevron-double-down"></i>
          </div>
          <div id="seconds">
            <i className="bi bi-chevron-double-up"></i>
            <span className="option-title">Seconds</span>
            <input
              type="number"
              value={seconds}
              max="60"
              min="0"
              onChange={(e) => setSeconds(e.target.value)}
              onInput={(e) => handleInput(e)}
            />
            <i className="bi bi-chevron-double-down"></i>
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
