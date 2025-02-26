function Clock(){
    return(
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
    )
}

export default Clock;