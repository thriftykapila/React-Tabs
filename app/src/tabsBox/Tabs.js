import React from "react";

export default function Tabs({
  activeIndex,
  leftScroll,
  numberOfTabs,
  dragging,
  handleDragStart,
  handleDragEnter,
  showCloseButton,
  setShowClose,
  getStyles,
  handleActiveTab,
  showClose,
  activeHover,
  handleCloseTab,
  showAlert,
}) {
  return (
    <>
      {" "}
      <div className="scrollable" ref={leftScroll}>
        {numberOfTabs.map((item, index) => {
          return (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, index);
                    }
                  : null
              }
              onMouseEnter={() => showCloseButton(index)}
              onMouseLeave={() => setShowClose(false)}
              key={index}
              className={
                `tab-title ` +
                (activeIndex === index ? "tab-title-active" : "") +
                (dragging ? getStyles(index) : " ")
              }
            >
              <div
                onClick={() => {
                  handleActiveTab(index, item);
                }}
                className="title-heading"
              >
                {item.title}
              </div>
              {index > 0 && showClose === true && activeHover === index ? (
                <div
                  onClick={() => {
                    handleCloseTab(index);
                  }}
                  className={
                    "x-icon " + (showAlert === true ? "x-icon-disabled" : "")
                  }
                >
                  x
                </div>
              ) : (
                <div className="x-icon x-icon-invisible">x</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
