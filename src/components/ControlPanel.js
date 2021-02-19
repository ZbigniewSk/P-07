import React from 'react'
import styles from './ControlPanel.module.scss'
import Button from './Button'

const ControlPanel = (props) => {

    return (
        <div className={styles.container}>
            <Button className="left" onClick={props.handleLeftClick} >&larr;</Button>
            <Button className="up" onClick={props.handleUpClick} >&uarr;</Button>
            <Button className="down" onClick={props.handleDownClick} >&darr;</Button>
            <Button className="right" onClick={props.handleRightClick} >&rarr;</Button>
            <Button className="turn" onClick={props.handleTurnClick} >Turn</Button>
            <Button className="next" onClick={props.handleNextClick} >Enter</Button>
        </div>
    )
}

export default ControlPanel