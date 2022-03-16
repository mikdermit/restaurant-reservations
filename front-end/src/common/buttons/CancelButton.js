import React from "react"
import { useHistory } from "react-router-dom"

export default function CancelButton() {
    const history = useHistory()

    const handleClick = () => {
        history.goBack()
    }

    return (
        <button type="button" className="btn btn-secondary m-3" onClick={handleClick}>
          Cancel
        </button>
      );
}