import React from "react";
export default function ShowAlert({ setShowAlert }) {
  return (
    <div className="alert-dialogue">
      <div>
        Tab deleted successfully{" "}
        <span role="img" aria-label="Wink">
          &#x1F609;
        </span>
      </div>
      <button
        className="btn-success"
        onClick={() => {
          setShowAlert(false);
        }}
      >
        OK
      </button>
    </div>
  );
}
