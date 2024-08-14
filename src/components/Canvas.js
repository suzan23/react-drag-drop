// src/components/Canvas.js
import React, { useState } from "react";
import { useDrop } from "react-dnd";

import Card from "./Card";
const Canvas = () => {
  const [cards, setCards] = useState([]);

  const handleDrop = (item, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    setCards((prevCards) =>
      prevCards.map((card, index) =>
        index === item.index ? { ...card, left, top } : card
      )
    );
  };

  const [, drop] = useDrop({
    accept: "CARD",
    drop: handleDrop,
  });

  const addCard = () => {
    setCards([
      ...cards,
      {
        text: "Explore the wonders of the universe with captivating insights and engaging narratives that spark curiosity and inspire wonder in every discovery",
        left: 50,
        top: 50,
        width: 300,
        height: 210,
      },
    ]);
  };

  return (
    <div className="canvas-container">
      <button onClick={addCard} className="add-card-button">
        Add Card
      </button>
      <div className="canvas" ref={drop}>
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            text={card.text}
            left={card.left}
            top={card.top}
            width={card.width}
            height={card.height}
            onChange={(updatedCard) =>
              setCards((prevCards) =>
                prevCards.map((c, i) => (i === index ? updatedCard : c))
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
