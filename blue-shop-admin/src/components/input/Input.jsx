import React from 'react'
import './input.css'

const Input = (props) => {

    const handleChange = e => {
        if(props.type === 'file') {
            const { name } = e.target
            const value = e.target
            props.onChange(name, value)
        } else {
            const { name, value } = e.target
            props.onChange(name, value)
        }
    }

    return (
        <>
            {
                props.type === 'file' ? 
                <div>
                    <label>{props.label}</label>
                    <div className="input-file">
                        <input type="file" name={props.name} id={props.name} onChange={handleChange} />
                        <label htmlFor={props.name} className="input-label">
                            {props.value ? <img className="img-upload" src={props.value} /> : <i className='bx bxs-cloud-upload icon-upload'></i>}
                        </label>
                    </div>
                </div>
                :
                ( props.type === 'textarea' ? 
                <div className="text-field">
                    <label htmlFor={props.name}>{props.label}</label>
                    <textarea autoComplete="on" name={props.name} type={props.type} id={props.name} placeholder={props.placeholder} value={props.value} onChange={handleChange} />
                </div>
                :
                <div className="text-field">
                    <label htmlFor={props.name}>{props.label}</label>
                    <input autoComplete="on" name={props.name} type={props.type} id={props.name} placeholder={props.placeholder} value={props.value} onChange={handleChange} />
                </div>
                )
            }
        </>
        
    )
}

export default Input