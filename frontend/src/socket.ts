import { io } from "socket.io-client";
const URL = "https://presentation-app-dyvp.onrender.com/";
//process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

// socket.on("connect", () => {
//    console.log(socket.id);
// });
