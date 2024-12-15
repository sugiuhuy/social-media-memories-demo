/**
 * Calculate the difference between the current date and the given date.
 * @param date - The date to be compared with the current date.
 * @returns An object containing the differences in milliseconds, seconds, minutes, hours, days, weeks, months and years.
 */
function dateMoment(date: Date) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  /**
   * Calculate the difference in milliseconds.
   */
  const diffInMilliseconds: number = currentDate.getTime() - inputDate.getTime();

  /**
   * Calculate the difference in seconds.
   */
  const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);

  /**
   * Calculate the difference in minutes.
   */
  const diffInMinutes: number = Math.floor(diffInSeconds / 60);

  /**
   * Calculate the difference in hours.
   */
  const diffInHours: number = Math.floor(diffInMinutes / 60);

  /**
   * Calculate the difference in days.
   */
  const diffInDays: number = Math.floor(diffInHours / 24);

  /**
   * Calculate the difference in weeks.
   */
  const diffInWeeks: number = Math.floor(diffInDays / 7);

  /**
   * Calculate the difference in months as an array of strings.
   */
  const diffInMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /**
   * Calculate the difference in years.
   */
  const diffInYears: number = Math.floor(diffInDays / 365);

  return {
    inputDate,
    diffInSeconds,
    diffInMinutes,
    diffInHours,
    diffInDays,
    diffInWeeks,
    diffInMonths,
    diffInYears,
  };
}

/**
 * Formats the given date into a human-readable string representing the time difference from the current date.
 * @param date - The date to be formatted.
 * @returns A string representing the time difference from the current date in a human-readable format.
 *
 * @example
 * const formattedDate = postMoment(new Date()); // output: "a second ago"
 */
export function postMoment(date: Date) {
  const { diffInDays, diffInHours, diffInMinutes, diffInMonths, diffInSeconds, diffInWeeks, diffInYears, inputDate } =
    dateMoment(date);

  // Check if the difference is less than a minute
  if (diffInSeconds < 60) return `${diffInSeconds > 1 ? `${diffInSeconds} seconds` : "a second"} ago`;

  // Check if the difference is less than an hour
  if (diffInMinutes < 60) return `${diffInMinutes > 1 ? `${diffInMinutes} minutes` : "a minute"} ago`;

  // Check if the difference is less than a day
  if (diffInHours < 24) return `${diffInHours > 1 ? `${diffInHours} hours` : "a hour"} ago`;

  // Check if the difference is less than a week
  if (diffInDays < 7) return `${diffInDays > 1 ? `${diffInDays} days` : "a day"} ago`;

  // Check if the difference is more than a week but less than a year
  if (diffInDays > 7) return `${diffInWeeks > 1 ? `${inputDate.getDay()} ${diffInMonths[inputDate.getMonth()]}` : "a week"} ago`;

  // Check if the difference is less than a year
  if (diffInYears < 1) return "a year ago";

  // Return the formatted date for dates older than a year
  return `${inputDate.getDay()} ${diffInMonths[inputDate.getMonth()]} ${inputDate.getFullYear()}`;
}

/**
 * Formats the given date into a human-readable string representing the time difference from the current date for a comment.
 * @param date - The date to be formatted.
 * @returns A string representing the time difference from the current date in a human-readable format.
 *
 * @example
 * const formattedDate = commentMoment(new Date()); // output: "1s"
 */
export function commentMoment(date: Date) {
  const { diffInDays, diffInHours, diffInMinutes, diffInSeconds, diffInWeeks, diffInYears } = dateMoment(date);

  // Check if the difference is less than a minute
  if (diffInSeconds < 60) return `${diffInSeconds}s`;

  // Check if the difference is less than an hour
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  // Check if the difference is less than a day
  if (diffInHours < 24) return `${diffInHours}h`;

  // Check if the difference is less than a week
  if (diffInDays < 7) return `${diffInDays}d`;

  // Check if the difference is less than a year
  if (diffInDays > 7) return `${diffInWeeks}w`;

  // Check if the difference is less than a year
  if (diffInYears < 1) return `${diffInYears}y`;

  // Return the formatted date for dates older than a year
  return `${diffInYears}y`;
}

/**
 * Formats the given date into a human-readable string representing the time difference from the current date.
 * @param date - The date to be formatted.
 * @returns A string representing the time difference from the current date in a human-readable format.
 *
 * @example
 * const formattedDate = moment(new Date()); // output: "01/01/2023, 00:00"
 */
export function moment(date: Date) {
  const { diffInDays, inputDate } = dateMoment(date);

  // If the difference is less than a day, return the time in 12-hour format
  if (diffInDays < 1) {
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // If the difference is less than a year, return the date in "DD MMM" format
  if (diffInDays < 365) {
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }

  // If the difference is more than a year, return the date in "DD/MM/YYYY" format
  return `${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
}
