import { useState } from "react";
import { Button } from "../ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { socket } from "@/socket";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function HomeHeader() {
   const user = useSelector((state: any) => state.user.user);
   const [roomName, setRoomName] = useState("");
   const navigate = useNavigate();
   const { userId } = useParams();
   const createRoom = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const roomId = uuidv4();
      const roomData = {
         id: roomId,
         title: roomName,
         creator: userId,
      };
      socket.emit("room:create", roomData);
      setRoomName("");
      navigate(`/rooms/${roomId}?user=${userId}`);
   };
   return (
      <header className=" bg-slate-950 text-white">
         <div className="container">
            <div className="flex justify-between items-center py-2">
               <div className="text-3xl font-black text-white">Logo</div>
               <div className="w-1/4">
                  <Input
                     type="text"
                     placeholder="Search"
                     className="text-black bg-white border-none w-full"
                  />
               </div>
               <div className="flex gap-3 items-center">
                  <Dialog>
                     <DialogTrigger asChild>
                        <Button variant="outline" className="text-black">
                           Create
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="max-w-md">
                        <DialogHeader>
                           <DialogTitle>
                              Enter your presentation name.
                           </DialogTitle>
                           <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form
                           onSubmit={(e) => createRoom(e)}
                           className="flex flex-col gap-3"
                        >
                           <Input
                              type="text"
                              placeholder="Presentation name"
                              value={roomName}
                              onChange={(e) => setRoomName(e.target.value)}
                           />
                           <DialogClose asChild>
                              <Button type="submit">Create</Button>
                           </DialogClose>
                        </form>
                     </DialogContent>
                  </Dialog>

                  <span className="p-2">{user ? user.name : "nickname"}</span>
               </div>
            </div>
         </div>
      </header>
   );
}

export default HomeHeader;
