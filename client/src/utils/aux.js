import { getStylistAppointments, getStylists } from "./api";
import { bookingPrefs } from "./staticSettings";

export async function getStylistData() {
  try {
    const response = await getStylists();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const stylists = await response.json();
    const vitalData = stylists.map((stylist) => {
      return { title: stylist.name, value: stylist._id };
    });
    return vitalData;
  } catch (err) {
    console.error(err);
  }
}

export async function getAppointmentData(who) {
  try {
    const response = await getStylistAppointments(who);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const appointments = await response.json();
    console.log(appointments);
  } catch (err) {
    console.error(err);
  }
}

export function parseAvailableBlocks(stylistAppointments) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let onDate = new Date(now);
  onDate.setDate(now.getDate() + 1);
  let openBlocks = [];
  for (let i = 0; i < bookingPrefs.bookingWindow; i++) {
    let dayOfWeek = onDate.getDay();
    let daySchema = bookingPrefs.dailyHours[dayOfWeek];
    if (daySchema.isOpen) {
      let date = onDate.toLocaleDateString();
      let target = new Date(`${date} ${daySchema.opens}`).getTime();
      let close = new Date(`${date} ${daySchema.closes}`).getTime();
      let openings = [];
      while (target < close) {
        if (!stylistAppointments.includes(target)) {
          let targetObj = new Date(target);
          let hours = targetObj.getHours();
          let minutes = targetObj.getMinutes();
          let ampm = hours >= 12 ? "PM" : "AM";
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          hours = hours % 12 || 12;
          let parsedTarget = `${hours}:${minutes} ${ampm}`;
          openings.push(parsedTarget);
        }
        target = target + 3600000;
      }
      if (openings.length) {
        let dailySchedule = {
          date,
          openings,
          dateString: `${dayNames[dayOfWeek]}, ${date}`,
        };
        openBlocks.push(dailySchedule);
      }
    }
    onDate.setDate(onDate.getDate() + 1);
  }
  console.log(openBlocks);
  return openBlocks;
}
