export const secondsToDisplay = (seconds: number): string => {
  const totalHours = Math.floor(seconds / (60 * 60));
  seconds -= totalHours * 60 * 60;

  const totalMinutes = Math.floor(seconds / 60);
  seconds -= totalMinutes * 60;

  let resultingString = '';
  if (totalHours > 0) {
    resultingString = `${totalHours.toString()}:${totalMinutes.toString().padStart(2, '0')}`;
  } else {
    resultingString = `${totalMinutes.toString()}`;
  }

  return `${resultingString}:${Math.floor(seconds).toString().padStart(2, '0')}`;
};
