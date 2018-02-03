// Date Calculator
function dayCalc (tweetData) {
  const today = new Date();
  const tweetDate = new Date(tweetData.created_at);
  const diffCount = (today - tweetDate);
  const timesConv = {
    sec: 1000,
    min: 60000,
    hour: 3600000,
    day: 86400000,
    month: 2678400000,
    year: 31536000000
  }

  // If less than a minute ago
  if (diffCount < timesConv.min) {
    const secCount = Math.floor(diffCount / timesConv.sec);
    return `${secCount} seconds ago`;
  // If less than an hour ago
  } else if (diffCount < timesConv.hour) {
    const minCount = Math.floor(diffCount / timesConv.min);
    return `${minCount} minutes ago`;
  // less than 2 hours ago
  } else if (diffCount < (timesConv.hour * 2)) {
    return 'an hour ago';
  // less than a day
  } else if (diffCount < timesConv.day) {
    const hourCount = Math.floor(diffCount / timesConv.hour);
    return `${hourCount} hours ago`;
  // less than 2 days
  } else if (diffCount < (timesConv.day * 2)) {
      return 'A day ago';
  // less than a month
  } else if (diffCount < timesConv.month) {
    const dayCount = Math.floor(diffCount / timesConv.day);
    return `${dayCount} days ago`;
  // less than a year
  } else if (diffCount < timesConv.year) {
    const monthCount = Math.floor(diffCount / timesConv.month);
    return `${monthCount} months ago`;
  // less than 2 years
  } else if (diffCount < (timesConv.year * 2)) {
    return '1 year ago';
  // more than 2 years
  } else {
    return `${Math.floor(diffCount / timesConv.year)} years ago`;
  }
}