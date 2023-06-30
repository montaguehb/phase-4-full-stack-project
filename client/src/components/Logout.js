import React from 'react'
import { Button }  from "semantic-ui-react"
const Logout = ({updateUser}) => {
    const handleClick = async () => {
        const resp = await fetch("/logout", {
            method: "POST"
        })
        updateUser(resp.ok)
    }
  return (
    <Button onClick={handleClick}>Logout</Button>
  )
}

export default Logout