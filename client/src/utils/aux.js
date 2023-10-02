import {
  getFutureStylistAppointments,
  getStylists,
  getOneStylist,
  postAppointment,
} from "./api";
import { bookingPrefs } from "./staticSettings";

export async function getStylistData() {
  try {
    const response = await getStylists();
    if (!response.ok) throw new Error("Something went wrong");
    const stylists = await response.json();
    const vitalData = stylists.map((stylist) => {
      return { title: stylist.name, value: stylist._id };
    });
    return vitalData;
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
}

export async function getAppointmentData(who) {
  try {
    const response = await getFutureStylistAppointments(who);
    if (!response.ok) throw new Error("Something went wrong");
    const appointments = await response.json();
    return appointments.map((appt) => appt.time);
  } catch (err) {
    console.error(err);
    return new Error(err);
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
  let onDate = new Date();
  onDate.setDate(onDate.getDate() + 1);
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
  return openBlocks;
}

export function parseTimecode(timecode) {
  const stamp = new Date(timecode);
  const date = stamp.toLocaleDateString();
  let hours = stamp.getHours();
  let minutes = stamp.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours % 12 || 12;
  let time = `${hours}:${minutes} ${ampm}`;
  console.log({ date, time });
  return { date, time };
}

export function getServices() {
  return bookingPrefs.services.map((service) => {
    return { title: `${service.name} – ${service.price}`, value: service.name };
  });
}

export function getDateStringByTimeZone(timecode) {
  const date = new Date(timecode);
  const options = {
    timeZone: bookingPrefs.timeZone,
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const dateString = new Intl.DateTimeFormat("en-US", options).format(date);
  return dateString;
}

export async function fetchAndParseStylistName(data) {
  try {
    const response = await getOneStylist(data);
    if (!response.ok) throw new Error("Error fetching stylist");
    const stylist = await response.json();
    return stylist;
  } catch (err) {
    console.error(err);
  }
}

export async function createAppointment(data) {
  try {
    const response = await postAppointment(data);
    if (!response.ok) throw new Error("Error creating appointment");
    const appointment = await response.json();
    console.log(appointment);
    return appointment;
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
}
