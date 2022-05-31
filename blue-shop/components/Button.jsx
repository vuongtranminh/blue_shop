import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {

    const bg = props.background ? 'bg-' + props.background : ''

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''

    const className = props.className ? props.className : ''
    
    const disabled = props.disabled ? true : false
    
    const type = props.type ? props.type : 'button'

    return (
        <button
            className={`btn ${bg} ${size} ${animate} ${disabled ? 'btn--disabled' : ''} ${className}`}
            onClick={props.onClick ? () => props.onClick() : null}
            disabled={disabled}
            type={type}
        >
            <span className="btn__txt">{props.children}</span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`${props.icon} bx-tada`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

Button.propTypes = {
    background: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func
}

export default Button
