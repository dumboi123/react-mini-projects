function Input(){
    return (
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
    )
}

export default Input;