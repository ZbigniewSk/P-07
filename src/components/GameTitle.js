import React from 'react'
import styles from './GameTitle.module.scss'

const GameTitle = (props) => {

    return (
        <div className={styles.gameTitle}>
            {props.children}
        </div>
    )
}

export default GameTitle