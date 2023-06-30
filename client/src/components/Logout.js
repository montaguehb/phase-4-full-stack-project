import React from 'react'
import { Button }  from "semantic-ui-react"
const Logout = ({updateLogin}) => {
    const handleClick = async () => {
        const resp = await fetch("/logout", {
            method: "POST"
        })
        updateLogin(resp.ok)
    }
  return (
    <Button onClick={handleClick}>Logout</Button>
  )
}

export default Logout