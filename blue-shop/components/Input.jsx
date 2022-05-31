import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
    const label = props.label
    const type = props.type ? props.type : 'text'
    const placeholder = props.placeholder ? props.placeholder : ''
    const value = props.value
    const name = props.name
    const autoComplete = props.autoComplete ? props.autoComplete : 'on'
    const className = props.className ? props.className : ''
    const message = props.message ? props.message : null
    const required = props.required ? props.required : false
    const logo = props.logo ? props.logo : ''
    const disabled = props.disabled

    const handleChange = e => {
        const { name, value } = e.target
        props.onChange(name, value)
    }

    const handleBlur = e => {
        const { name, value } = e.target
        props.onBlur ? props.onBlur(name, value) : null
    }

    const handleFocus = e => {
        const { name } = e.target
        props.onFocus ? props.onFocus(name) : null
    }

    return (
        <div className={`input-group ${className}`}>
            <div className="input-group__wrapper">
                {label && <div className="input-group__label">{label}</div>}
                <div className="input-group__inner">
                    {logo && <img src={logo} />}
                    {type === 'textarea' ? (
                        <textarea
                            autoComplete={autoComplete}
                            name={name}
                            id={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            required={required}
                            disabled={disabled}
                            rows="4"
                        />
                    ) : (
                        <input
                            autoComplete={autoComplete}
                            type={type}
                            name={name}
                            id={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            required={required}
                            disabled={disabled}
                        />
                    )}
                </div>
            </div>
            {message ? (<p className="input-group__message text-gradient-orange">{message}</p>) : null}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    autoComplete: PropTypes.string
}

export default Input;
