import React from 'react'
import './button.css'

const Button = (props) => {
    return <button className={`button ${props.className}`} onClick={props.onClick ? () => props.onClick() : null}>{props.label}</button>
}

export default Button