import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
   cors: {
      origin: [
         "http://localhost:5173",
         "https://presentation-app-frontend.onrender.com/",
      ],
   },
});
app.get("/", (req, res) => {
   res.send("<h1>Hello world</h1>");
});

//Socket.io logic
let allUsers = [];
let rooms = [];

const addUser = (user) => {
   !allUsers.some((u) => user.userId === u.userId) && allUsers.push(user);
};
const removeUser = (socketId) => {
   allUsers = allUsers.filter((u) => u.socketId !== socketId);
};
const findUser = (userId) => {
   return allUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
   //send rooms list every second
   socket.emit("getRooms", rooms);
   const getRooms = setInterval(() => {
      socket.emit("getRooms", rooms);
   }, 5000);

   //add/update user after connection/reconnection
   socket.on("addUser", (userData) => {
      try {
         const existUser = findUser(userData.id);
         if (existUser) {
            allUsers.map((user) => {
               if (user.userId === userData.id) {
                  user.socketId = socket.id;
               }
               return user;
            });
         } else {
            addUser({
               userId: userData.id,
               name: userData.name,
               editor: false,
               socketId: socket.id,
            });
         }
      } catch (error) {
         console.log(error);
      }
   });
   //save elements of room and send room data
   socket.on("elements:create", (data) => {
      try {
         const userRooms = [...socket.rooms];
         let joinedRoom;
         rooms = rooms.map((room) => {
            if (room.id == userRooms[1]) {
               room.elements = data;
               joinedRoom = room;
            }
            return room;
         });
         if (joinedRoom) {
            socket.to(userRooms[1]).emit("room:get", {
               ...joinedRoom,
               users: [...joinedRoom.users],
            });
         }
      } catch (error) {
         console.log(error);
      }
   });
   //create room and join it
   socket.on("room:create", (room) => {
      try {
         rooms.push({ ...room, elements: [], users: new Set() });
         socket.join(room.id);
         let joinedRoom;
         rooms = rooms.map((r) => {
            if (r.id === room.id) {
               if (room.creator) r.users.add(room.creator);
               joinedRoom = r;
            }
            return r;
         });
         if (joinedRoom) {
            console.log(socket.rooms, joinedRoom.id);
            io.to(joinedRoom.id).emit("room:get", {
               ...joinedRoom,
               users: [...joinedRoom.users],
            });
         }
      } catch (error) {
         console.log(error);
      }
   });
   //join room and send room data
   socket.on("room:join", (room) => {
      try {
         socket.join(room.id);
         let joinedRoom;
         rooms = rooms.map((r) => {
            if (r.id === room.id) {
               if (room.user) r.users.add(room.user);
               joinedRoom = r;
            }
            return r;
         });
         if (joinedRoom) {
            io.to(joinedRoom.id).emit("room:get", {
               ...joinedRoom,
               users: [...joinedRoom.users],
            });
         }
      } catch (error) {
         console.log(error);
      }
   });
   //leave from all rooms
   socket.on("leaveRooms", (data) => {
      try {
         rooms.forEach((room) => {
            socket.leave(room.id);
            room.users.delete(data.user);
         });
      } catch (error) {
         console.log(error);
      }
   });
   //send users data by users id
   socket.on("user:send", (data) => {
      try {
         const users = allUsers.filter((u) => data.includes(u.userId));
         socket.emit("user:get", users);
      } catch (error) {
         console.log(error);
      }
   });

   socket.on("mouse:send", (data) => {
      try {
         socket.to(data.roomId).emit("mouse:get", { x: data.x, y: data.y });
      } catch (error) {
         console.log(error);
      }
   });
   socket.on("disconnect", () => {
      console.log("user disconnected");
   });
});
server.listen(3000, () => {
   console.log("server running at http://localhost:3000");
});
