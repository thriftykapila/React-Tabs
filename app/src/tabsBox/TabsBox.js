import React, { useRef, useState } from "react";
import ShowAlert from "./ShowAlert";
import TabData from "./TabData";
import Tabs from "./Tabs";
import "./TabsBox.css";
export default function App() {
  const leftScroll = useRef();
  const dragItem = useRef();
  const dragItemNode = useRef();
  const [dragging, setDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [activeHover, setActiveHover] = useState();
  const [showClose, setShowClose] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "Tab 1",
    content: "Tab 1 contents",
  });
  const [numberOfTabs, setNumberOfTabs] = useState(TabData(3));

  function handleActiveTab(index, item) {
    setActiveIndex(index);
    setActiveItem(item);
  }

  function scrollLeft() {
    leftScroll.current.scrollLeft -= 144;
  }
  function scrollRight() {
    leftScroll.current.scrollLeft += 144;
  }

  function handleCloseTab(index) {
    if (activeIndex === index) {
      setActiveItem(numberOfTabs[index - 1]);
      setActiveIndex(index - 1);
    }

    let found = numberOfTabs.filter((item, i) => {
      return index !== i;
    });
    setNumberOfTabs(found);
    setShowAlert(true);
  }

  function showCloseButton(index) {
    setShowClose(true);
    setActiveHover(index);
  }

  function handleAddTab() {
    const newTabs = [
      ...numberOfTabs,
      { title: `Tab ${numberOfTabs.length + 1}`, content: "New Content" },
    ];
    setNumberOfTabs(newTabs);
    TabData(numberOfTabs);
  }

  function handleDragStart(e, index) {
    dragItem.current = index;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  }

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (index) => {
    if (dragItem.current === index) {
      return " current";
    }
    return " ";
  };

  function handleDragEnter(e, currentIndex) {
    if (dragItem.current !== currentIndex) {
      let newList = [];
      newList = [...numberOfTabs];
      [newList[dragItem.current], newList[currentIndex]] = [
        newList[currentIndex],
        newList[dragItem.current],
      ];
      setNumberOfTabs(newList);
    }
  }

  return (
    <>
      <div className="tabWrapper">
        {activeIndex !== 0 && numberOfTabs.length > 4 && (
          <div
            className="tab-title left-arrow-icon"
            onClick={() => {
              scrollLeft();
            }}
          >
            &lt;
          </div>
        )}
        <Tabs
          activeIndex={activeIndex}
          leftScroll={leftScroll}
          numberOfTabs={numberOfTabs}
          dragging={dragging}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          showCloseButton={showCloseButton}
          setShowClose={setShowClose}
          getStyles={getStyles}
          handleActiveTab={handleActiveTab}
          showClose={showClose}
          activeHover={activeHover}
          handleCloseTab={handleCloseTab}
          showAlert={showAlert}
        />
        {activeIndex !== 9 && numberOfTabs.length > 4 && (
          <div
            className="tab-title right-arrow-icon"
            onClick={() => {
              scrollRight();
            }}
          >
            &gt;
          </div>
        )}
        {numberOfTabs.length < 10 ? (
          <div
            className="tab-title plus-icon"
            onClick={() => {
              handleAddTab();
            }}
          >
            +
          </div>
        ) : (
          ""
        )}
      </div>
      {activeItem ? (
        <>
          <div className="tab-content">{activeItem.content}</div>
        </>
      ) : (
        ""
      )}

      {showAlert && <ShowAlert setShowAlert={setShowAlert} />}
    </>
  );
}
