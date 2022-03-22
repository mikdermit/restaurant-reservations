import React from "react";
import { useHistory } from "react-router-dom";

export default function BackButton() {
  const history = useHistory();
  // on click redirect to previous page
  const handleClick = () => {
    history.goBack();
  };

  return (
    <button
      type="button"
      className="btn btn-secondary w-25 mt-3"
      onClick={handleClick}
    >
      Cancel
    </button>
  );
}
