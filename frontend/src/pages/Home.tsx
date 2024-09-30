import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "@/socket";
import HomeHeader from "@/components/myComponents/HomeHeader";

function Home() {
   const [rooms, setRooms] = useState<any>([]);

   const navigate = useNavigate();
   const { userId } = useParams();

   const joinRoom = (room: any) => {
      const data = { ...room, user: userId };
      socket.emit("room:join", data);
      navigate(`/rooms/${room.id}?user=${userId}`);
   };

   useEffect(() => {
      socket.on("getRooms", (data) => {
         setRooms(data);
      });
      socket.emit("leaveRooms", { user: userId });
      return () => {
         socket.off("getRooms");
      };
   }, []);

   return (
      <div>
         <HomeHeader />
         <main>
            <div className="container">
               <div className="">
                  <div className="flex justify-end py-3">
                     <span className="p-2 cursor-pointer hover:bg-stone-100 rounded-full">
                        <DashboardIcon className="w-full" />
                     </span>
                     <span className="p-2 cursor-pointer hover:bg-stone-100 rounded-full">
                        <ListBulletIcon className="w-full" />
                     </span>
                  </div>
                  <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
                     {rooms.map((room: any) => (
                        <Card className="h-[150px] p-4" key={room.id}>
                           <div className="flex flex-col h-full justify-end">
                              <span className="p-4">{room.title}</span>
                              <Button onClick={() => joinRoom(room)}>
                                 Join
                              </Button>
                           </div>
                        </Card>
                     ))}
                  </div>
                  <div className="py-5">
                     <Pagination className="justify-end">
                        <PaginationContent>
                           <PaginationItem>
                              <PaginationPrevious href="#" />
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationLink href="#" isActive>
                                 2
                              </PaginationLink>
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationLink href="#">3</PaginationLink>
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationEllipsis />
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationNext href="#" />
                           </PaginationItem>
                        </PaginationContent>
                     </Pagination>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}

export default Home;
