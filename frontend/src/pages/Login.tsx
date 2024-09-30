import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/socket";
import { useDispatch } from "react-redux";
import { setUser } from "@/toolkit/userSlice/userSlice";

function Login() {
   const [nickname, setNickname] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleClick = () => {
      const id = uuidv4();
      const userData: any = {
         id,
         name: nickname,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      socket.emit("addUser", userData);
      dispatch(setUser(userData));
      navigate(`/${userData.id}`);
   };
   return (
      <div className=" h-screen flex justify-center items-center">
         <Card>
            <CardHeader>
               <CardTitle>Please enter your Nickname</CardTitle>
            </CardHeader>
            <CardContent>
               <Label htmlFor="nickname">Nickname</Label>
               <Input
                  id="nickname"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
               />
            </CardContent>
            <CardFooter>
               <Button className="w-full" onClick={handleClick}>
                  Enter
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
}

export default Login;
