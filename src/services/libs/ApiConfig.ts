export const API_URLS = {
  Base: process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5000",
};

export const API_CONFIG = {
  withCredentials: process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS === "true",
};
