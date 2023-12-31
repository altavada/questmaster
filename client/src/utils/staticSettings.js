export const bookingPrefs = {
  timeZone: "America/New_York",
  bookingWindow: 30,
  dailyHours: {
    0: {
      isOpen: false,
    },
    1: {
      isOpen: true,
      opens: "09:00",
      closes: "17:00",
    },
    2: {
      isOpen: true,
      opens: "09:00",
      closes: "17:00",
    },
    3: {
      isOpen: true,
      opens: "09:00",
      closes: "17:00",
    },
    4: {
      isOpen: true,
      opens: "09:00",
      closes: "17:00",
    },
    5: {
      isOpen: true,
      opens: "09:00",
      closes: "17:00",
    },
    6: {
      isOpen: false,
    },
  },
  services: [
    {
      name: "Haircut",
      price: "$30",
    },
    {
      name: "Shave",
      price: "$25",
    },
    {
      name: "Hair trim",
      price: "$20",
    },
    {
      name: "Beard trim",
      price: "$20",
    },
  ],
};
