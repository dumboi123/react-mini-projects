import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [startTimer, setStartTimer] = useState(true);
  const [time, setTime] = useState(20);
  const [isRunning, setIsRunning] = useState(false);

  const prevTime = useRef();
  // console.log(`re-render time ${time}`);

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

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleReset = () => {
    if (time === 0) {
      window.alert("Time hasn't started yet");
      return;
    }
    setTime(0);
    setIsRunning(false);
    setStartTimer(true);
  };

  const handleStartContinue = () => {
    if (time === 0) {
      setStartTimer(false);
      setIsRunning(true);
      return;
    }
    setIsRunning(!isRunning);
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
              <div id="start">
                <i className="bi bi-play-fill"></i> Start
              </div>
              <div id="pause">
              <i className="bi bi-pause-fill"></i> Pause</div>
              <div id="reset">
              <i className="bi bi-arrow-clockwise"></i> Reset</div>
            </div>
          </div>
        </div>
        <div id="options">
          <div id="session">
            <i id="incrSession" className="fas fa-angle-double-up"></i>
            <span className="option-title">Session</span>
            <input
              id="sessionInput"
              type="number"
              value="30"
              max="60"
              min="5"
              defaultValue={time}
            />
            <i id="decrSession" className="fas fa-angle-double-down"></i>
          </div>
          <div id="break">
            <i id="incrBreak" className="fas fa-angle-double-up"></i>
            <span className="option-title">Break</span>
            <input
              id="breakInput"
              type="number"
              value="5"
              max="10"
              min="1"
              defaultValue={time}
            />
            <i id="decrBreak" className="fas fa-angle-double-down"></i>
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
        autoplay="false"
        src="https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/rain.mp3"
      ></audio>
    </>
  );
}

export default App;
