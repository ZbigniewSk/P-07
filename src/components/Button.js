import React from 'react'
import styles from './Button.module.scss'

const Button = (props) => {
    let className = styles.default
    switch(props.className) {
        case "start":
            className = styles.start
            break
        case "left":
            className = styles.left
            break
        case "up":
            className = styles.up
            break
        case "down":
            className = styles.down
            break
        case "right":
            className = styles.right
            break
        case "turn":
            className = styles.turn
            break
        case "next":
            className = styles.next
            break
        default:
            break
    }

    return (
        <button 
            className={className}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button