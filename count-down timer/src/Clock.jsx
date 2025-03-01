import React, { useRef, useEffect } from "react";
function Clock({
  logic,
  time,
  isRunning,
  handleStart,
  handlePause,
  handleReset,
  setToggleClick,
}) {
  const startRef = useRef();
  const pauseRef = useRef();
  const resetRef = useRef();

  console.log("Clock rendered");
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

  useEffect(() => {
    setToggleClick(() => toggleClick);
  }, [setToggleClick]);
  
  return (
    <div id="clock">
      <div id="timer">
        <div id="title">Ready?</div>
        <div id="countdown">
          <span id="time">{logic.formatTime(time)}</span>
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
  );
}

export default React.memo(Clock);
