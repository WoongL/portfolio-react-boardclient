export const API_URI =
  process.env.NODE_ENV === "production"
    ? "https://lw-board-server.herokuapp.com"
    : "http://localhost:8080";
