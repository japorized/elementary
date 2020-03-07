const $datetime_day = document.querySelector(".datetime-day");
const $datetime_time = document.querySelector(".datetime-time");

export function clock() {
  const rawtime = new Date();
  let curHours = rawtime.getHours();
  let curMinutes = rawtime.getMinutes();
  let curSeconds = rawtime.getSeconds();
  const curDay = rawtime.getDay();
  let daystr;

  curHours = (curHours < 10 ? "0" : "") + curHours;
  curMinutes = (curMinutes < 10 ? "0" : "") + curMinutes;
  curSeconds = (curSeconds < 10 ? "0" : "") + curSeconds;

  switch (curDay) {
    case 0:
      daystr = "日";
      break;
    case 1:
      daystr = "月";
      break;
    case 2:
      daystr = "火";
      break;
    case 3:
      daystr = "水";
      break;
    case 4:
      daystr = "木";
      break;
    case 5:
      daystr = "金";
      break;
    case 6:
      daystr = "土";
      break;
    default:
      daystr = " ";
  }

  if (curSeconds % 2 == 0)
    var curTimeString = curHours + ":" + curMinutes + ":" + curSeconds;
  else var curTimeString = curHours + " " + curMinutes + " " + curSeconds;

  $datetime_time.innerHTML = curTimeString;
  $datetime_day.innerHTML = daystr;
}

// Initiate the clock
clock();

// Redraw the clock every second
setInterval(clock, 1000);
