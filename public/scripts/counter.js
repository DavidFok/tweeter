// Date Calculator
function dayCalc (tweetData) {
  const today = new Date();
  const tweetDate = new Date(tweetData.created_at);
  const diffCount = (today - tweetDate);
  // If less than a minute ago
  if (diffCount < 60000) {
    const secCount = Math.floor(diffCount / 1000);
    const counter = `${secCount} seconds ago`;
    return counter;
  // If less than an hour ago
  } else if (diffCount < 3600000) {
    const minCount = Math.floor(diffCount / 60000);
    const counter = `${minCount} minutes ago`;
    return counter;
  // less than 2 hours ago
  } else if (diffCount < 7200000) {
    const counter = '1 hour ago';
    return counter;
  // less than a day
  } else if (diffCount < 86400000) {
    const hourCount = Math.floor(diffCount / 3600000);
    const counter = `${hourCount} hours ago`;
    return counter;
  // less than a month
  } else if (diffCount < 2678400000) {
    const dayCount = Math.floor(diffCount / 86400000);
    const counter = `${dayCount} days ago`;
    return counter;
  // less than a year
  } else if (diffCount < 31536000000) {
    const monthCount = Math.floor(diffCount / 2678400000);
    const counter = `${monthCount} months ago`;
    return counter;
  // less than 2 years
  } else if (diffCount < 63072000000) {
    const counter = '1 year ago';
    return counter;
  // more than 2 years
  } else {
    const counter = `${Math.floor(diffCount / 31536000000)} years ago`;
    return counter;
  }
}