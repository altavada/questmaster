export const getStylists = () => {
  return fetch("/api/stylists/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getStylistAppointments = (stylist) => {
  return fetch(`/api/appointments/stylist/${stylist}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
