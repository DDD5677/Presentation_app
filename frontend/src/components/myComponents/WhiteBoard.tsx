import {
   Arrow,
   Circle,
   Layer,
   Line,
   Rect,
   Stage,
   Transformer,
} from "react-konva";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS, SHAPES } from "@/utils/constants";
import { socket } from "@/socket";

function WhiteBoard({ action, fillColor, strokeColor, transparent }: any) {
   const stageRef: any = useRef();
   const [elements, setElements] = useState<any>([]);

   const isPainting = useRef<any>();
   const currentShapeId = useRef<any>();
   const transformerRef = useRef<any>();
   const isDraggable = action === ACTIONS.SELECT;

   const onPointerDown = () => {
      if (action === ACTIONS.SELECT) return;
      const stage: any = stageRef.current;
      const { x, y } = stage.getPointerPosition();
      const id = uuidv4();
      currentShapeId.current = id;
      isPainting.current = true;
      console.log("hello");
      switch (action) {
         case ACTIONS.SQUARE:
            setElements((elements: any) => [
               ...elements,
               {
                  id,
                  x,
                  y,
                  height: 20,
                  width: 20,
                  fillColor: transparent ? "transparent" : fillColor.square,
                  strokeColor: strokeColor.square,
                  type: SHAPES.SQUARE,
               },
            ]);
            break;
         case ACTIONS.CIRCLE:
            setElements((elements: any) => [
               ...elements,
               {
                  id,
                  x,
                  y,
                  radius: 20,
                  fillColor: transparent ? "transparent" : fillColor.circle,
                  strokeColor: strokeColor.circle,
                  type: SHAPES.CIRCLE,
               },
            ]);
            break;
         case ACTIONS.ARROW:
            setElements((elements: any) => [
               ...elements,
               {
                  id,
                  x: 0,
                  y: 0,
                  points: [x, y, x + 20, y + 20],
                  fillColor: transparent ? "transparent" : fillColor.arrow,
                  strokeColor: strokeColor.arrow,
                  type: SHAPES.ARROW,
               },
            ]);
            break;
         case ACTIONS.PENCIL:
            setElements((elements: any) => [
               ...elements,
               {
                  id,
                  x: 0,
                  y: 0,
                  points: [x, y],
                  strokeColor: strokeColor.pencil,
                  type: SHAPES.FREETEXT,
               },
            ]);
            break;
         case ACTIONS.LINE:
            setElements((elements: any) => [
               ...elements,
               {
                  id,
                  x: 0,
                  y: 0,
                  points: [x, y],
                  strokeColor: strokeColor.line,
                  type: SHAPES.LINE,
               },
            ]);
            break;
      }
   };
   const onPointerMove = () => {
      if (action === ACTIONS.SELECT || !isPainting.current) return;
      const stage: any = stageRef.current;
      const { x, y } = stage.getPointerPosition();

      switch (action) {
         case ACTIONS.SQUARE:
            setElements((elements: any) =>
               elements.map((element: any) => {
                  if (element.id === currentShapeId.current) {
                     return {
                        ...element,
                        width: x - element.x,
                        height: y - element.y,
                     };
                  }
                  return element;
               })
            );
            break;
         case ACTIONS.CIRCLE:
            setElements((circles: any) =>
               circles.map((circle: any) => {
                  if (circle.id === currentShapeId.current) {
                     return {
                        ...circle,
                        radius: Math.sqrt(
                           (x - circle.x) ** 2 + (y - circle.y) ** 2
                        ),
                     };
                  }
                  return circle;
               })
            );
            break;
         case ACTIONS.ARROW:
            setElements((arrows: any) =>
               arrows.map((arrow: any) => {
                  if (arrow.id === currentShapeId.current) {
                     return {
                        ...arrow,
                        points: [arrow.points[0], arrow.points[1], x, y],
                     };
                  }
                  return arrow;
               })
            );
            break;
         case ACTIONS.PENCIL:
            setElements((scribbles: any) =>
               scribbles.map((scribble: any) => {
                  if (scribble.id === currentShapeId.current) {
                     return {
                        ...scribble,
                        points: [...scribble.points, x, y],
                     };
                  }
                  return scribble;
               })
            );
            break;
         case ACTIONS.LINE:
            setElements((elements: any) =>
               elements.map((element: any) => {
                  if (element.id === currentShapeId.current) {
                     return {
                        ...element,
                        points: [element.points[0], element.points[1], x, y],
                     };
                  }
                  return element;
               })
            );
            break;
      }
      socket.emit("elements:create", elements);
   };
   const onPointerUp = () => {
      isPainting.current = false;
   };

   // const exportFile = () => {
   //    const uri = stageRef?.current?.toDataURL();
   //    let link = document.createElement("a");
   //    link.download = "image.png";
   //    link.href = uri;
   //    document.body.appendChild(link);
   //    link.click();
   //    document.body.removeChild(link);
   // };

   const onClick = (e: any) => {
      if (action !== ACTIONS.SELECT) return;
      const target = e.currentTarget;
      transformerRef.current.nodes([target]);
   };

   const handleDragMove = (e: any) => {
      const target = e.target;
      const id = target.id();
      const x = target.x();
      const y = target.y();
      setElements(
         elements.map((element: any) => {
            if (element.id == id) {
               element.x = x;
               element.y = y;
            }
            return element;
         })
      );
      socket.emit("elements:create", elements);
   };
   useEffect(() => {
      socket.on("room:get", (data) => {
         setElements(data.elements);
      });
   }, []);
   return (
      <div className="whiteboard">
         <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
         >
            <Layer>
               <Rect
                  x={0}
                  y={0}
                  width={window.innerWidth}
                  height={window.innerHeight}
                  fill="#ffffff"
                  id="bg"
                  onClick={() => {
                     transformerRef.current.nodes([]);
                  }}
               />
               {elements.map((element: any) => {
                  switch (element.type) {
                     case SHAPES.SQUARE:
                        return (
                           <Rect
                              id={element.id}
                              key={element.id}
                              x={element.x}
                              y={element.y}
                              width={element.width}
                              height={element.height}
                              stroke={element.strokeColor}
                              strokeWidth={2}
                              fill={element.fillColor}
                              draggable={isDraggable}
                              onDragMove={(e) => handleDragMove(e)}
                              onClick={onClick}
                           />
                        );
                     case SHAPES.CIRCLE:
                        return (
                           <Circle
                              id={element.id}
                              key={element.id}
                              x={element.x}
                              y={element.y}
                              radius={element.radius}
                              stroke={element.strokeColor}
                              strokeWidth={2}
                              fill={element.fillColor}
                              onDragMove={(e) => handleDragMove(e)}
                              draggable={isDraggable}
                              onClick={onClick}
                           />
                        );
                     case SHAPES.ARROW:
                        return (
                           <Arrow
                              id={element.id}
                              key={element.id}
                              x={element.x}
                              y={element.y}
                              points={element?.points}
                              stroke={element.strokeColor}
                              strokeWidth={2}
                              fill={element.fillColor}
                              onDragMove={(e) => handleDragMove(e)}
                              draggable={isDraggable}
                              onClick={onClick}
                           />
                        );
                     case SHAPES.FREETEXT:
                        return (
                           <Line
                              id={element.id}
                              key={element.id}
                              x={element.x}
                              y={element.y}
                              lineCap="round"
                              lineJoin="round"
                              points={element?.points}
                              stroke={element.strokeColor}
                              strokeWidth={2}
                              onDragMove={(e) => handleDragMove(e)}
                              draggable={isDraggable}
                              onClick={onClick}
                           />
                        );
                     case SHAPES.LINE:
                        return (
                           <Line
                              id={element.id}
                              key={element.id}
                              x={element.x}
                              y={element.y}
                              lineCap="round"
                              lineJoin="round"
                              points={element?.points}
                              stroke={element.strokeColor}
                              strokeWidth={2}
                              onDragMove={(e) => handleDragMove(e)}
                              draggable={isDraggable}
                              onClick={onClick}
                           />
                        );
                  }
               })}
               <Transformer ref={transformerRef} />
            </Layer>
         </Stage>
      </div>
   );
}

export default WhiteBoard;
