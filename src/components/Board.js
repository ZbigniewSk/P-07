import React from 'react'
import styles from './Board.module.scss'
import Square from './Square'
import { nanoid } from '@reduxjs/toolkit'

const Board = ({ gameState, boardStyle }) => {
    const display = [...Array(4)].map((v, i) => (
        <div key={nanoid()}>
            {[...Array(4)].map((v, j) => <Square 
                                            value={boardStyle[j * 4 + i]}
                                            move={gameState.move}
                                            coinSelect={gameState.coinSelect}  
                                            key={nanoid()} 
                                            />)}
        </div>
    ))

    return (
        <div className={styles.board}>
            {display}
        </div>
    )
}

export default Board