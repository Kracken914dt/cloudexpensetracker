export function getColombiaTime(): Date {
  const now = new Date();
  const colombiaOffset = -5;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const colombiaTime = new Date(utc + 3600000 * colombiaOffset);
  return colombiaTime;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().replace("T", " ").substring(0, 19);
}
