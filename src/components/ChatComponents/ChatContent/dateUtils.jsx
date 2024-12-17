// utils/dateUtils.js
export function getDateLabel(date) {
  const today = new Date();
  const messageDate = new Date(date);

  const isToday =
    today.getFullYear() === messageDate.getFullYear() &&
    today.getMonth() === messageDate.getMonth() &&
    today.getDate() === messageDate.getDate();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    yesterday.getFullYear() === messageDate.getFullYear() &&
    yesterday.getMonth() === messageDate.getMonth() &&
    yesterday.getDate() === messageDate.getDate();

  if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
