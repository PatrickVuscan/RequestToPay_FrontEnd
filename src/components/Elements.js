import React from 'react';
import './Elements.css';

export function Button(props){
    return (
        <button 
            className={props.className + " button"} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}