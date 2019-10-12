export function parseDate(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function parse12HourTime(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

export function parseDateTime(date: Date) {
  return parseDate(date) + " " + parse12HourTime(date);
}
