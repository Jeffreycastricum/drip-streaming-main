import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/assets/footer-logo.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-dashboard">
        <h1>Dashboard</h1>
      </div>

      <div className="footer-logo">
        <Link href="/">
          <div className="footer-link">
            <Image src={Logo} alt="logo" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Footer
