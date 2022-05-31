import React, { useState } from 'react';

const Dropdown = (props) => {

    return (
        <div className="dropdown">
            {props.children[0]}
            <ul className={`dropdown-list ${isShow && "active"}`}>
                {props.children[1]}
            </ul>
        </div>
    );
};

export const DropdownSelected = (props) => {
    console.log(props)
    return <div className="dropdown__selected" onClick={() => props.onShow()}>{props.children}</div>
}

export const DropdownItem = (props) => {
    return <li className="dropdown__item">{props.children}</li>
}

export default Dropdown;
