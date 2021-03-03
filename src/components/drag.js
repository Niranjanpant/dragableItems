import React, { useState, useRef } from "react";
import "./drag.css";

const Drag = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("dragging started", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    // console.log("entering drag", params);
    const currentItem = dragItem.current;

    if (e.target !== dragNode.current) {
      console.log("target is not same");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.index].items.splice(
          params.itemI,
          0,
          newList[currentItem.index].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;

        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.index === params.index &&
      currentItem.itemI === params.itemI
    ) {
      return "property dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp, index) => (
        <div key={grp.title} className="dnd-group">
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => {
                handleDragStart(e, { index, itemI });
              }}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { index, itemI });
                    }
                  : null
              }
              key={item}
              className={dragging ? getStyles({ index, itemI }) : "dnd-item"}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Drag;
