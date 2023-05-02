import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Logo from '@/assets/drip-logo.png'
import Wallet from '../Wallet/index'

const Navbar = () => {
  return (
    <div>
      <div className="navabr-container">
        <div className="navbar-logo">
          <Link href="/">
            <Image src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar-elements">
          <div className="navbar-search">
            <input type="search" placeholder="Search" required />
          </div>

          <div className="navbar-icons">
            <div>+</div>
            <div>✉︎</div>
            <div>🔔</div>
          </div>

          <Wallet />
        </div>
      </div>
    </div>
  )
}

export default Navbar
