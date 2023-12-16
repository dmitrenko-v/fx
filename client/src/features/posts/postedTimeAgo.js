export default function postedTimeAgo(datePosted) {
  const timeDiff = new Date() - new Date(datePosted);
  const years = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 31 / 365);
  const months = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 31);
  const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(timeDiff / 1000 / 60 / 60);
  const minutes = Math.floor(timeDiff / 1000 / 60);
  return years
    ? years + "y"
    : months
    ? months + "mo"
    : days
    ? days + "d"
    : hours
    ? hours + "h"
    : minutes
    ? minutes + "m"
    : "now";
}
