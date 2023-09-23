import { getStylistAppointments, getStylists } from "./api";
import { bookingPrefs } from "./staticSettings";

export async function getStylistData() {
  try {
    const response = await getStylists();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const stylists = await response.json();
    console.log("Raw stylist JSON data fetched from db:", stylists);
    const vitalData = stylists.map((stylist) => {
      return { title: stylist.name, value: stylist._id };
    });
    console.log(
      "Parsed / formatted stylist data for dropdown component:",
      vitalData
    );
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
    console.log("Raw appointmentByStylist JSON fetched from db:", appointments);
    return appointments.map((appt) => appt.time);
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
  console.log(
    "Util function parseAvailableBlocks finds all future appointment openings for stylist within the company's booking window."
  );
  console.log(
    "Accepts array of stylist's appointment times as argument and reads the business settings object to determine valid, open schedule blocks."
  );
  console.log(
    "Business settings object defining opening hours, timezone, and booking window (no. of days from today):",
    bookingPrefs
  );
  console.log(
    "Returns array of objects necessary to configure customer's date/time choices and retrieve necessary form data."
  );
  console.log(
    "Each object represents a day on which the business is open and stylist is NOT fully-booked."
  );
  console.log(
    "Object keys contain the numeric date, array of timestamps for stylist's open (unbooked) schedule blocks on that date, and formatted date string."
  );
  console.log("openBlocks array:", openBlocks);
  return openBlocks;
}
