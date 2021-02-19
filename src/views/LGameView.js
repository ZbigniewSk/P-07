import React, { Fragment, useState, useEffect } from 'react'
import Board from '../components/Board'
import styles from './LGameView.module.scss'
import Button from '../components/Button'
import GameStateDisplay from '../components/GameStateDisplay'
import ControlPanel from '../components/ControlPanel'
import { handleMove, handleNext, handleTurn, blockPositionOnBoard, calculateWinner } from '../assets/lgameMethods'

const LGameView = () => {
    const initialState = [{
        redId: { position: 6, rotation: 0 },
        blueId: { position: 9, rotation: 3},
        coinAId: 0,
        coinBId: 15,
        move: 0,
        coinSelect: false,
    }, {
        redId: { position: 6, rotation: 0 },
        blueId: { position: 9, rotation: 3},
        coinAId: 0,
        coinBId: 15,
        move: 0,
        coinSelect: false,
    }]
    const [gameStates, setGameState] = useState(initialState)
    const gameState = gameStates[gameStates.length - 1]
    const boardStyle = blockPositionOnBoard({...gameState})
    const winner = calculateWinner({...gameState})

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    const handleKeyDown = (e) => {
        let nextState
        switch (e.keyCode) {
            case 32: 
                nextState = handleTurn({...gameState})
                setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
                break
            case 13:
                nextState = handleNext([...gameStates], boardStyle)
                if (nextState[0]) {
                setGameState(gameStates.slice(1, gameStates.length).concat(nextState[1]))
                } else {
                    setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState[1]))
                }
                break
            case 37:
                nextState = handleMove({...gameState}, "left")
                setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
                break
            case 38:
                nextState = handleMove({...gameState}, "up")
                setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
                break
            case 39:
                nextState = handleMove({...gameState}, "right")
                setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
                break
            case 40:
                nextState = handleMove({...gameState}, "down")
                setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
                break
            default: 
                break
        }
    }

    const handleNewGameClick = () => {
        setGameState(initialState)
    }

    const handleTurnClick = () => {
        const nextState = handleTurn({...gameState})
        setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
    }

    const handleLeftClick = () => {
        const nextState = handleMove({...gameState}, "left")
        setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
    }

    const handleRightClick = () => {
        const nextState = handleMove({...gameState}, "right")
        setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
    }

    const handleUpClick = () => {
        const nextState = handleMove({...gameState}, "up")
        setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
    }

    const handleDownClick = () => {
        const nextState = handleMove({...gameState}, "down")
        setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState)) 
    }

    const handleNextClick = () => {
        const nextState = handleNext([...gameStates], boardStyle)
        if (nextState[0]) {
        setGameState(gameStates.slice(1, gameStates.length).concat(nextState[1]))
        } else {
            setGameState(gameStates.slice(0, gameStates.length - 1).concat(nextState[1]))
        }
    }

    return (
        <Fragment>
            <div className={styles.wrapper}>
                <Button
                    onClick={handleNewGameClick}
                    className="start"
                >
                    New Game
                </Button>
                <GameStateDisplay
                    move={gameState.move}
                    winner={winner}
                />
                <Board 
                    gameState={gameState}
                    boardStyle={boardStyle}
                />
                <ControlPanel
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    handleUpClick={handleUpClick}
                    handleDownClick={handleDownClick}
                    handleTurnClick={handleTurnClick}
                    handleNextClick={handleNextClick}
                />
            </div>
        </Fragment>
    )
}

export default LGameView