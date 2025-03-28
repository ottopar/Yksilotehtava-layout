export const sortName = (a, b) => {
  (a.name.toLowerCase() || "").localeCompare(b.name.toLowerCase() || "");
};
