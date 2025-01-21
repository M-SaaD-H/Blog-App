import React from 'react'
import { Container, Logo, LogoutBtn } from "../index.js"
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  
  // const navigate = useNavigate(); // used to navigate forcefully or to navigate programatically with any click

  // This array will be looped to add buttons in nav
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='py-2 px-6 flex justify-between items-center'>
          <div>
            <NavLink to='/'>
              <Logo />
            </NavLink>
          </div>
          <ul className='flex gap-2'>
            {
              navItems.map((item) => 
                item.active ? (
                  <li key={name}>
                    <NavLink to={item.slug} className={({isActive}) => `text-green-600 hover:text-green-700 duration-200 ${isActive ? "text-green-600" : "text-white"}`}>
                    {item.name}
                    </NavLink>
                  </li>
                ) : null
              )
            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header
