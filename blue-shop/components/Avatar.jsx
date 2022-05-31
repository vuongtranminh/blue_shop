import React from 'react'

const Avatar = (props) => {

    const avatar = props.avatar ? props.avatar : "/images/avatar_default.jpg";

  return (
    <div className="avatar">
        <div className="avatar__img" style={{background: `url(${avatar})`}}></div>
    </div>
  )
}

export default Avatar