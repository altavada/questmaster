export const getStylists = () => {
  return fetch("/api/stylists/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
