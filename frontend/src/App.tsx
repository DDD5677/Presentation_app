import { Suspense, useEffect, useState } from "react";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { socket } from "./socket";
import { useSelector } from "react-redux";
const router = createBrowserRouter([
   {
      path: "/:userId",
      element: <Home />,
   },
   {
      path: "/",
      element: <Login />,
   },
   {
      path: "/rooms/:roomId",
      element: <Room />,
   },
]);
function App() {
   const [isConnected, setIsConnected] = useState(socket.connected);
   const user = useSelector((state: any) => state.user.user);
   useEffect(() => {
      function onConnect() {
         setIsConnected(true);
         user && socket.emit("addUser", user);
         console.log("connected", isConnected);
      }

      function onDisconnect() {
         setIsConnected(false);
         console.log("disconnected", isConnected);
      }

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      return () => {
         socket.off("connect", onConnect);
         socket.off("disconnect", onDisconnect);
      };
   }, []);
   return (
      <Suspense>
         <RouterProvider router={router} />
      </Suspense>
   );
}

export default App;
