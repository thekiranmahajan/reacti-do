export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const time = date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDate = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${time} ${formattedDate}`;
};
