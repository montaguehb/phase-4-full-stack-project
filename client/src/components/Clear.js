import React from 'react'

const Clear = () => {
    const handleClick = async () => {
        const resp = await fetch("/clear", {
            method: "POST"
        })
        if (resp.ok) {
            alert("Cleared session")
        }
        else {
            alert("Unable to clear session")
        }
    }
  return (
    <button onClick={handleClick}>Clear</button>
  )
}

export default Clear