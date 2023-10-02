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

export const getFutureStylistAppointments = (stylist) => {
  return fetch(`/api/appointments/stylist/future/${stylist}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getOneStylist = (stylist) => {
  return fetch(`/api/stylists/${stylist}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postAppointment = (data) => {
  return fetch(`/api/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
