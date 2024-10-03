// Формирование URL с query параметрами;

const path = "api/vehicles";
const query = {
  id: "7",
  theme: "blue",
};

export const urlQueryHelper = (
  path: string,
  query: { [key: string]: string }
) => {
  const urlParams = new URLSearchParams(Object.entries(query));
  return `${path}${urlParams.toString()}`;
};
