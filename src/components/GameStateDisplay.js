import React from 'react'
import styles from './GameStateDisplay.module.scss'

const GameStateDisplay = (props) => {
    let display = "Default"
    let className = styles.gameStateDisplayRed
    switch (props.move) {
        case 0:
            display = "Move red block"
            className = styles.gameStateDisplayRed
            break
        case 1:
            display = "Choose coin"
            className = styles.gameStateDisplayRed
            break
        case 2:
            display = "Move coin"
            className = styles.gameStateDisplayRed
            break
        case 3:
            display = "Move blue block"
            className = styles.gameStateDisplayBlue
            break
        case 4:
            display = "Choose coin"
            className = styles.gameStateDisplayBlue
            break
        case 5:
            display = "Move coin"
            className = styles.gameStateDisplayBlue
            break
        default:
            break
    }

    if (props.winner === "red") {
        display = "RED IS THE WINNER!"
        className = styles.gameStateDisplayRed
    } else if (props.winner === "blue") {
        display = "BLUE IS THE WINNER!"
        className = styles.gameStateDisplayBlue
    }

    return (
        <div
            className={className}
        >
            {display}
        </div>
    )
}

export default GameStateDisplay