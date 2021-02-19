import React from 'react'
import styles from './Square.module.scss'

const Square = ({ value, move, coinSelect }) => {
    let buttonClass = styles.grey
    let coinClass = styles.coin
    
    if (value.style === "red") {
        if (move === 0) {
            buttonClass = styles.activeRed
        } else {
            buttonClass = styles.red
        }    
    } else if (value.style === "blue") {
        if (move === 3) {
            buttonClass = styles.activeBlue
        } else {
            buttonClass = styles.blue
        }
    } else if (value.style === "brown") {
        if (move === 0 || move === 3){
            buttonClass = styles.activeBrown
        } else {
            buttonClass = styles.brown
        }
    } else {
        buttonClass = styles.grey
    }

    if ((value.coinA && !coinSelect) || (value.coinB && coinSelect)) {
        if (move === 1 || move === 2) {
            coinClass = styles.activeCoinRed
        } else if (move === 4 || move === 5) {
            coinClass = styles.activeCoinBlue
        } else {
            coinClass = styles.coin
        }
    }

    return (
        <button className={buttonClass}
        >
            {value.coinA || value.coinB ? <div className={coinClass} /> : null}
        </button>
    )
}

export default Square