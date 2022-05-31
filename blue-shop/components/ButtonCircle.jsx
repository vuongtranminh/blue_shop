import React from 'react'

const ButtonCircle = (props) => {
  return (
    <div className="btn-circle" onClick={props.onClick ? () => props.onClick() : null}>
        <img src={props.logo} />
    </div>
  )
}

export default ButtonCircle