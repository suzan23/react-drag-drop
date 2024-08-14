import React from "react";
import Canvas from "./components/Canvas";
import "./App.css";
import { DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Canvas />
      </div>
    </DndProvider>
  );
};

export default App;
