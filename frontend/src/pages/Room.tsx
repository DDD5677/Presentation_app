import { Input } from "@/components/ui/input";
import { useLocation, useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import ToolBar from "@/components/myComponents/ToolBar";
import WhiteBoard from "@/components/myComponents/WhiteBoard";
import { ACTIONS } from "@/utils/constants";
import { socket } from "@/socket";
import { useSelector } from "react-redux";
function Room() {
   const user = useSelector((state: any) => state.user.user);
   const [roomData, setRoomData] = useState<any>();
   const [onlineUsers, setOnlineUsers] = useState<any>();
   const [action, setAction] = useState<any>(ACTIONS.SELECT);
   const [transparent, setTransparent] = useState(true);
   const [fillColor, setFillColor] = useState({
      pencil: "#000000",
      square: "#000000",
      circle: "#000000",
   });
   const [strokeColor, setStrokeColor] = useState<any>({
      pencil: "#000000",
      square: "#000000",
      circle: "#000000",
      arrow: "#000000",
      line: "#000000",
   });
   const cursor = useRef<any>();
   const { roomId } = useParams();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);

   // access query parameters
   const userId = queryParams.get("user");

   const getUsers = () => {
      socket.emit("user:send", roomData.users);
   };
   const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
   ) => {
      socket.emit("mouse:send", { roomId, x: e.pageX, y: e.pageY });
   };
   //socket.emit("room:join", { id: roomId, user: userId });
   useEffect(() => {
      socket.emit("room:join", {
         id: roomId,
         user: userId,
      });
      socket.on("room:get", (data) => {
         setRoomData(data);
      });
      socket.on("user:get", (data) => {
         setOnlineUsers(data);
      });
      socket.on("mouse:get", (data) => {
         //console.log(data);
         if (cursor.current) {
            cursor.current.style.left = data.x;
            cursor.current.style.top = data.y;
         }
      });
   }, []);

   return (
      <div onMouseMove={(e) => handleMouseMove(e)}>
         <header className="flex p-2 border-b border-gray-200 z-50 gap-5 justify-between fixed w-full top-0">
            <div className="text-center ">
               <p className="text-2xl font-bold">{user.name}</p>
               <span className="text-gray-300 text-sm">Status</span>
            </div>
            <div className="flex-grow flex justify-end gap-4">
               <div>
                  <div className="flex flex-col gap-2 w-[6rem]">
                     <Input
                        className="py-1 text-sm h-8 placeholder:text-xs"
                        type="number"
                        placeholder="Width"
                     />
                     <Input
                        className="text-sm h-8 placeholder:text-xs"
                        type="number"
                        placeholder="Height"
                     />
                  </div>
               </div>
               <ToolBar
                  action={action}
                  setAction={setAction}
                  fillColor={fillColor}
                  setFillColor={setFillColor}
                  strokeColor={strokeColor}
                  setStrokeColor={setStrokeColor}
                  transparent={transparent}
                  setTransparent={setTransparent}
               />
            </div>
            <div>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" onClick={getUsers}>
                        Users {roomData && roomData.users.length}
                     </Button>
                  </SheetTrigger>
                  <SheetContent>
                     <SheetHeader>
                        <SheetTitle className="text-3xl">Users</SheetTitle>
                        <SheetDescription></SheetDescription>
                     </SheetHeader>
                     {onlineUsers &&
                        onlineUsers.map((user: any) => (
                           <div
                              key={user.userId}
                              className="flex justify-between items-center"
                           >
                              <div className="flex gap-10">
                                 <span className="text-xl">{user.name}</span>
                                 <span>
                                    {user.editor ? "editor" : "viewer"}
                                 </span>
                              </div>
                              <div>
                                 <Switch id="airplane-mode" />
                              </div>
                           </div>
                        ))}
                  </SheetContent>
               </Sheet>
            </div>
         </header>
         <main>
            <WhiteBoard
               action={action}
               strokeColor={strokeColor}
               fillColor={fillColor}
               transparent={transparent}
            />
         </main>
         <svg
            className="absolute z-[1000]"
            ref={cursor}
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            stroke="#000000"
         >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
               id="SVGRepo_tracerCarrier"
               strokeLinecap="round"
               strokeLinejoin="round"
               stroke="#ff"
               strokeWidth="26.624000000000002"
            >
               <path
                  d="M593.066667 846.933333c-2.133333 0-4.266667 0-8.533334-2.133333s-8.533333-6.4-12.8-10.666667l-78.933333-183.466666-96 89.6c-2.133333 4.266667-6.4 6.4-12.8 6.4-2.133333 0-6.4 0-8.533333-2.133334-6.4-2.133333-12.8-10.666667-12.8-19.2V256c0-8.533333 4.266667-17.066667 12.8-19.2 2.133333-2.133333 6.4-2.133333 8.533333-2.133333 4.266667 0 10.666667 2.133333 14.933333 6.4l341.333334 320c6.4 6.4 8.533333 14.933333 6.4 23.466666-2.133333 8.533333-10.666667 12.8-19.2 14.933334l-134.4 12.8 83.2 181.333333c2.133333 4.266667 2.133333 10.666667 0 17.066667-2.133333 4.266667-6.4 10.666667-10.666667 12.8l-61.866667 27.733333c-4.266667-4.266667-8.533333-4.266667-10.666666-4.266667z"
                  fill="#fff"
               />

               <path
                  d="M384 256l341.333333 320-164.266666 14.933333 96 209.066667-61.866667 27.733333-91.733333-211.2L384 725.333333V256m0-42.666667c-6.4 0-10.666667 2.133333-17.066667 4.266667-14.933333 6.4-25.6 21.333333-25.6 38.4v469.333333c0 17.066667 10.666667 32 25.6 38.4 6.4 4.266667 12.8 4.266667 17.066667 4.266667 10.666667 0 21.333333-4.266667 29.866667-10.666667l72.533333-68.266666 66.133333 155.733333c4.266667 10.666667 12.8 19.2 23.466667 23.466667 4.266667 2.133333 10.666667 2.133333 14.933333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667l61.866667-27.733333c10.666667-4.266667 19.2-12.8 23.466666-23.466667 4.266667-10.666667 4.266667-23.466667 0-32l-70.4-153.6 104.533334-8.533333c17.066667-2.133333 32-12.8 36.266666-27.733333 6.4-14.933333 2.133333-34.133333-10.666666-44.8l-341.333334-320c-6.4-10.666667-17.066667-14.933333-27.733333-14.933334z"
                  fill="#fff212121"
               />
            </g>

            <g id="SVGRepo_iconCarrier">
               <path
                  d="M593.066667 846.933333c-2.133333 0-4.266667 0-8.533334-2.133333s-8.533333-6.4-12.8-10.666667l-78.933333-183.466666-96 89.6c-2.133333 4.266667-6.4 6.4-12.8 6.4-2.133333 0-6.4 0-8.533333-2.133334-6.4-2.133333-12.8-10.666667-12.8-19.2V256c0-8.533333 4.266667-17.066667 12.8-19.2 2.133333-2.133333 6.4-2.133333 8.533333-2.133333 4.266667 0 10.666667 2.133333 14.933333 6.4l341.333334 320c6.4 6.4 8.533333 14.933333 6.4 23.466666-2.133333 8.533333-10.666667 12.8-19.2 14.933334l-134.4 12.8 83.2 181.333333c2.133333 4.266667 2.133333 10.666667 0 17.066667-2.133333 4.266667-6.4 10.666667-10.666667 12.8l-61.866667 27.733333c-4.266667-4.266667-8.533333-4.266667-10.666666-4.266667z"
                  fill="#fff"
               />

               <path
                  d="M384 256l341.333333 320-164.266666 14.933333 96 209.066667-61.866667 27.733333-91.733333-211.2L384 725.333333V256m0-42.666667c-6.4 0-10.666667 2.133333-17.066667 4.266667-14.933333 6.4-25.6 21.333333-25.6 38.4v469.333333c0 17.066667 10.666667 32 25.6 38.4 6.4 4.266667 12.8 4.266667 17.066667 4.266667 10.666667 0 21.333333-4.266667 29.866667-10.666667l72.533333-68.266666 66.133333 155.733333c4.266667 10.666667 12.8 19.2 23.466667 23.466667 4.266667 2.133333 10.666667 2.133333 14.933333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667l61.866667-27.733333c10.666667-4.266667 19.2-12.8 23.466666-23.466667 4.266667-10.666667 4.266667-23.466667 0-32l-70.4-153.6 104.533334-8.533333c17.066667-2.133333 32-12.8 36.266666-27.733333 6.4-14.933333 2.133333-34.133333-10.666666-44.8l-341.333334-320c-6.4-10.666667-17.066667-14.933333-27.733333-14.933334z"
                  fill="#fff212121"
               />
            </g>
         </svg>
      </div>
   );
}

export default Room;
