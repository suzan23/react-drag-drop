// src/components/Card.js
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ResizableBox } from "react-resizable";
import Modal from "react-modal";
import "react-resizable/css/styles.css";

const Card = ({ text, left, top, width, height, onChange, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleResize = (e, data) => {
    onChange({
      text,
      left,
      top,
      width: data.size.width,
      height: data.size.height,
    });
  };

  const handleShowMore = () => setIsModalOpen(true);
  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div
        ref={drag}
        style={{
          position: "absolute",
          left,
          top,
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
      >
        <ResizableBox
          ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}
          onResize={handleResize}
          className="card"
        >
          <div className="card-content">
            <p className="card-text">
              {isExpanded
                ? text
                : text.length > 50
                ? text.slice(0, 50) + "... "
                : text}
              {text.length > 50 && (
                <span
                  onClick={toggleText}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {isExpanded ? " less" : " more"}
                </span>
              )}
            </p>
            <button onClick={handleShowMore} className="show-more-button">
              Show More
            </button>
          </div>
        </ResizableBox>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: "600px",
            height: "700px",
            margin: "auto",
            padding: "20px",
          },
        }}
      >
        <h2>Card Details</h2>
        <p>{text}</p>
        <button onClick={() => setIsModalOpen(false)} className="close-button">
          Close
        </button>
      </Modal>
    </>
  );
};

export default Card;
