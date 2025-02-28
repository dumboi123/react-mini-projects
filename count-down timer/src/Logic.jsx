const convertTime = (hoursInput, minutesInput, secondsInput) => {
  const hoursToSeconds = hoursInput * 3600;
  const minutesToSeconds = minutesInput * 60;
  const totalSeconds = hoursToSeconds + minutesToSeconds + secondsInput;
  return totalSeconds;
};

const formatTime = (totalTime) => {

  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;
  
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export { convertTime, formatTime, clamp };
