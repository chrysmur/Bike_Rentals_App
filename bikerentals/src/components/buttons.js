import  React from 'react'
import './button.css'

const Button = (props)=> {
    const {name,clickHandler}= props
    const handleClick = ()=>{ 
        clickHandler(name)
    }
    return (
        <button className = 'buttons' id = {name} onClick={handleClick}>{name}</button>
        )
    }

export default Button