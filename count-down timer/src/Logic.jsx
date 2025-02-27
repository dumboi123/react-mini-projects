const convertTime = (hoursInput, minutesInput, secondsInput) => {
  const hoursToSeconds = hoursInput * 3600;
  const minutesToSeconds = minutesInput * 60;
  const totalSeconds = hoursToSeconds + minutesToSeconds + secondsInput;
  return totalSeconds;
};

const formatTime = (hours, minutes, seconds) => {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export { convertTime, formatTime, clamp };
