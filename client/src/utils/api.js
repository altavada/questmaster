export const getStylists = () => {
  return fetch("/api/stylists/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
