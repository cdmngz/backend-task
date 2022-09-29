/**
 * Check the user last time request date to an specific route
 * @param {string} value - db value with the user last time request date
 * @return {number} - time remaining to unlock user access to the API
 */
export const getTimeRemaining = (value: string): number => {
  const dbLastAccessDate = Number(value);
  const plusOneHour = dbLastAccessDate + 60 * 60 * 1000;
  return (plusOneHour - Date.now()) / 60 / 60 / 1000;
};

/**
 * Get the time remaining in timestamp number, and shows a toString version
 * @param {number} value - time remaining to unlock the user in timestamp format
 * @return {string} - time remaining to unlock user access to the API in format (in 56 minutes)
 */
export const formatTimeRemaining = (value: number): string => {
  const timeRemaining = value;
  const rtf = new Intl.RelativeTimeFormat();
  return rtf.format(
    Math.ceil(timeRemaining >= 1 ? timeRemaining : timeRemaining * 60),
    timeRemaining >= 1 ? "hours" : "minutes"
  );
};
