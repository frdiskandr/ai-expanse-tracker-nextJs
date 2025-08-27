import React from 'react'
import { CheckUser } from '@/lib/checkUser'

const Navbar = async () => {
    const user = await CheckUser()
    console.log(user)
  return (
    <ul>
        <li>data user</li>
        <li>{user?.id}</li>
        <li>{user?.clerkUserId}</li>
        <li>{user?.name}</li>
        <li>{user?.imageUrl}</li>
    </ul>
  )
}

export default Navbar