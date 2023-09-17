import { getStylistAppointments, getStylists } from "./api";

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
