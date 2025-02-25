import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [startTimer, setStartTimer] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // console.log(`re-render time ${time}`);
  
  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

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
    <div className="container my-5">
      <h1 className="text-center mb-4">Countdown Timer</h1>

      <div className="card p-3 mx-auto" style={{ maxWidth: 400 }}>
        <div
          className="display bg-dark text-white text-center py-3 rounded mb-3"
          id="display"
        >
          {formatTime(time)}
        </div>
        <div className="d-flex justify-content-between">
          <button
            className={`btn ${
              isRunning
                ? "btn-warning"
                : startTimer
                ? "btn-success"
                : "btn-primary"
            }`}
            id="pauseButton"
            onClick={handleStartContinue}
          >
            {isRunning ? "Pause" : startTimer ? "Start" : "Continue"}
          </button>
          <button
            className="btn btn-danger"
            id="resetButton"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
