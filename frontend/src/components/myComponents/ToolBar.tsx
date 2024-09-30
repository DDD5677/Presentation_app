import {
   ArrowRightIcon,
   BorderSolidIcon,
   CircleIcon,
   CursorArrowIcon,
   FontBoldIcon,
   FontItalicIcon,
   FontRomanIcon,
   ImageIcon,
   Pencil1Icon,
   SquareIcon,
   TextAlignCenterIcon,
   TextAlignLeftIcon,
   TextAlignRightIcon,
   TextIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { ACTIONS } from "@/utils/constants";

function ToolBar({
   action,
   setAction,
   strokeColor,
   setStrokeColor,
   fillColor,
   setFillColor,
   transparent,
   setTransparent,
}: any) {
   const [width, setWidth] = useState(2);
   return (
      <div className="flex gap-5 items-start">
         <div>
            <Tabs
               defaultValue={action}
               onValueChange={(value) => setAction(value)}
            >
               <TabsList>
                  <TabsTrigger className="py-2" value={ACTIONS.SELECT}>
                     <CursorArrowIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.PENCIL}>
                     <Pencil1Icon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.LINE}>
                     <BorderSolidIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.CIRCLE}>
                     <CircleIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.SQUARE}>
                     <SquareIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.ARROW}>
                     <ArrowRightIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.IMAGE}>
                     <ImageIcon />
                  </TabsTrigger>
                  <TabsTrigger className="py-2" value={ACTIONS.TEXT}>
                     <TextIcon />
                  </TabsTrigger>
               </TabsList>
               <TabsContent className="mt-1" value={ACTIONS.PENCIL}>
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                           value={strokeColor.pencil}
                           onChange={(e) =>
                              setStrokeColor({
                                 ...strokeColor,
                                 pencil: e.target.value,
                              })
                           }
                        />
                     </div>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 2}
                        onPressedChange={() => setWidth(2)}
                     >
                        <span className="w-4	 h-[1px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 4}
                        onPressedChange={() => setWidth(4)}
                     >
                        <span className="w-4	 h-[2px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 6}
                        onPressedChange={() => setWidth(6)}
                     >
                        <span className="w-4	 h-1 bg-black inline-block" />
                     </Toggle>
                  </div>
               </TabsContent>
               <TabsContent className="mt-1" value={ACTIONS.LINE}>
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                           value={strokeColor.line}
                           onChange={(e) =>
                              setStrokeColor({
                                 ...strokeColor,
                                 line: e.target.value,
                              })
                           }
                        />
                     </div>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 2}
                        onPressedChange={() => setWidth(2)}
                     >
                        <span className="w-4	 h-[1px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 4}
                        onPressedChange={() => setWidth(4)}
                     >
                        <span className="w-4	 h-[2px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 6}
                        onPressedChange={() => setWidth(6)}
                     >
                        <span className="w-4	 h-1 bg-black inline-block" />
                     </Toggle>
                  </div>
               </TabsContent>
               <TabsContent className="mt-1" value={ACTIONS.CIRCLE}>
                  <div className="flex items-center gap-2">
                     {!transparent && (
                        <div className="w-6 h-6 border rounded-sm">
                           <Input
                              type="color"
                              className="p-0 h-full border-none"
                              value={fillColor.circle}
                              onChange={(e) =>
                                 setFillColor({
                                    ...fillColor,
                                    circle: e.target.value,
                                 })
                              }
                           />
                        </div>
                     )}
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                           value={strokeColor.circle}
                           onChange={(e) =>
                              setStrokeColor({
                                 ...strokeColor,
                                 circle: e.target.value,
                              })
                           }
                        />
                     </div>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 2}
                        onPressedChange={() => setWidth(2)}
                     >
                        <span className="w-4	 h-[1px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 4}
                        onPressedChange={() => setWidth(4)}
                     >
                        <span className="w-4	 h-[2px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 6}
                        onPressedChange={() => setWidth(6)}
                     >
                        <span className="w-4	 h-1 bg-black inline-block" />
                     </Toggle>
                  </div>
               </TabsContent>
               <TabsContent className="mt-1" value={ACTIONS.SQUARE}>
                  <div className="flex items-center gap-2">
                     {!transparent && (
                        <div className="w-6 h-6 border rounded-sm">
                           <Input
                              type="color"
                              className="p-0 h-full border-none"
                              value={fillColor.square}
                              onChange={(e) =>
                                 setFillColor({
                                    ...fillColor,
                                    square: e.target.value,
                                 })
                              }
                           />
                        </div>
                     )}
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                           value={strokeColor.square}
                           onChange={(e) =>
                              setStrokeColor({
                                 ...strokeColor,
                                 square: e.target.value,
                              })
                           }
                        />
                     </div>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 2}
                        onPressedChange={() => setWidth(2)}
                     >
                        <span className="w-4	 h-[1px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 4}
                        onPressedChange={() => setWidth(4)}
                     >
                        <span className="w-4	 h-[2px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 6}
                        onPressedChange={() => setWidth(6)}
                     >
                        <span className="w-4	 h-1 bg-black inline-block" />
                     </Toggle>
                  </div>
               </TabsContent>
               <TabsContent className="mt-1" value={ACTIONS.ARROW}>
                  <div className="flex items-center gap-2">
                     {!transparent && (
                        <div className="w-6 h-6 border rounded-sm">
                           <Input
                              type="color"
                              className="p-0 h-full border-none"
                              value={fillColor.arrow}
                              onChange={(e) =>
                                 setFillColor({
                                    ...fillColor,
                                    arrow: e.target.value,
                                 })
                              }
                           />
                        </div>
                     )}
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                           value={strokeColor.arrow}
                           onChange={(e) =>
                              setStrokeColor({
                                 ...strokeColor,
                                 arrow: e.target.value,
                              })
                           }
                        />
                     </div>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 2}
                        onPressedChange={() => setWidth(2)}
                     >
                        <span className="w-4	 h-[1px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 4}
                        onPressedChange={() => setWidth(4)}
                     >
                        <span className="w-4	 h-[2px] bg-black inline-block" />
                     </Toggle>
                     <Toggle
                        size="sm"
                        className="px-2"
                        pressed={width === 6}
                        onPressedChange={() => setWidth(6)}
                     >
                        <span className="w-4	 h-1 bg-black inline-block" />
                     </Toggle>
                  </div>
               </TabsContent>
               <TabsContent className="mt-1" value={ACTIONS.TEXT}>
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 border rounded-sm">
                        <Input
                           type="color"
                           className="p-0 h-full border-none"
                        />
                     </div>
                     <Toggle size="sm" className="px-2">
                        <TextAlignLeftIcon />
                     </Toggle>
                     <Toggle size="sm" className="px-2">
                        <TextAlignCenterIcon />
                     </Toggle>
                     <Toggle size="sm" className="px-2">
                        <TextAlignRightIcon />
                     </Toggle>
                     <Toggle size="sm" className="px-2">
                        <FontRomanIcon />
                     </Toggle>
                     <Toggle size="sm" className="px-2">
                        <FontItalicIcon />
                     </Toggle>
                     <Toggle size="sm" className="px-2">
                        <FontBoldIcon />
                     </Toggle>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
         <div className="flex items-center space-x-2 py-2">
            <Switch
               id="airplane-mode"
               checked={transparent}
               onCheckedChange={(value: boolean) => setTransparent(value)}
            />
            <Label htmlFor="airplane-mode">transparent</Label>
         </div>
      </div>
   );
}

export default ToolBar;
