import React from 'react'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="main">
        {children}
      </div>
    </div>
  )
}

export const Header = (props) => {

  const router = useRouter()

  const handleClickBack = () => {
    router.back()
  }

  return (
    <div className="header-page">
      {props.back && (
        <div className='header-page__back' onClick={handleClickBack}>
          <img src="/svgs/chevron-left.svg" />
        </div>
      )}
      <div className='header-page__title'>{props.title}</div>
    </div>
  )
}

export const Body = (props) => {
  return (
    <div className="body-page">
      {props.children}
    </div>
  )
}

export const Footer = (props) => {
  return (
    <div className="footer-page">
      {props.children}
    </div>
  )
}

export default Layout