//Table of avaliable red or blue block positions on board depends on rotation (tab index)
export const posTab = [
    [5, 6, 7, 9, 10, 11],
    [5, 6, 7, 9, 10, 11],
    [4, 5, 6, 8, 9, 10],
    [4, 5, 6, 8, 9, 10],
    [5, 6, 9, 10, 13, 14],
    [5, 6, 9, 10, 13, 14],
    [1, 2, 5, 6, 9, 10],
    [1, 2, 5, 6, 9, 10]
]

export const changeBlockRotation = ({ position, rotation }) => {
    const newRotation = (rotation + 1) % 8
    if (posTab[newRotation].find(v => v === position)) {
        rotation = newRotation
    }
    return { position, rotation }
}

export const changeBlockPosition = ({ position, rotation }, direction) => {
    let newPosition = 0
    switch (direction) {
        case "up":
            newPosition = position - 4
            break
        case "down":
            newPosition = position + 4
            break
        case "left":
            newPosition = position - 1
            break
        case "right":
            newPosition = position + 1
            break
        default:
            newPosition = position
            break
    }
    if (posTab[rotation].find(v => v === newPosition)) {
        position = newPosition
    }
    return { position, rotation }
}

export const changeCoinPosition = (position, direction) => {
    let newPosition = position
    const coinTab = {
        left: [0, 4, 8, 12],
        right: [3, 7, 11, 15],
        up: [0, 1, 2, 3],
        down: [12, 13, 14, 15]
    }
    switch (direction) {
        case "up":
            if (coinTab.up.find(v => v === position) === undefined) {
                newPosition = position - 4
            }
            break
        case "down":
            if (coinTab.down.find(v => v === position) === undefined) {
                newPosition = position + 4
            }
            break
        case "left":
            if (coinTab.left.find(v => v === position) === undefined) {
                newPosition = position - 1
            }
            break
        case "right":
            if (coinTab.right.find(v => v === position) === undefined) {
                newPosition = position + 1
            }
            break
        default:
            newPosition = position
            break
    }
    return newPosition
}

export const handleTurn = ({ redId, blueId, coinAId, coinBId, move, coinSelect }) => {
    if (move === 0) {
        redId = changeBlockRotation(redId)
    } else if (move === 3) {
        blueId = changeBlockRotation(blueId)
    } else if (move === 1 || move === 4) {
        coinSelect = !coinSelect
    }
    return { redId, blueId, coinAId, coinBId, move, coinSelect }
}

export const blockMoved = (prevState, currentState) => (prevState.redId.position !== currentState.redId.position) ||
                                                    (prevState.blueId.position !== currentState.blueId.position) ||
                                                    (prevState.redId.rotation !== currentState.redId.rotation) ||
                                                    (prevState.blueId.rotation !== currentState.blueId.rotation) ||
                                                    (currentState.move === 1 || currentState.move === 4) ||
                                                    (currentState.move === 2 || currentState.move === 5)

export const handleNext = (gameStates, boardStyle) => {
    const prevState = gameStates[gameStates.length - 2]
    const currentState = gameStates[gameStates.length - 1]
    const isBlockOnBlock = blockOnBlock(boardStyle)
    const isblockMoved = blockMoved(prevState, currentState)
                        
    if (isblockMoved && isBlockOnBlock === undefined) {
        currentState.move = (currentState.move + 1) % 6
        return [true, currentState]
    } else {
        return [false, currentState]
    }
}

export const handleMove = ({ redId, blueId, coinAId, coinBId, move, coinSelect }, direction) => {
    if (move === 0) {
        redId = changeBlockPosition(redId, direction)
    } else if (move === 3) {
        blueId = changeBlockPosition(blueId, direction)
    } else if (move === 2 || move === 5) {
        if (coinSelect) {
            coinBId = changeCoinPosition(coinBId, direction)
        } else {
            coinAId = changeCoinPosition(coinAId, direction)
        }
    }
    return { redId, blueId, coinAId, coinBId, move, coinSelect }
}

export const blockIdToBoardIndex = ({ position, rotation }) => {
    const blockIndex = [
        [position, position - 4, position + 4, position - 5],
        [position, position - 4, position + 4, position + 3],
        [position, position - 4, position + 4, position - 3],
        [position, position - 4, position + 4, position + 5],
        [position, position - 1, position + 1, position - 5],
        [position, position - 1, position + 1, position - 3],
        [position, position - 1, position + 1, position + 5],
        [position, position - 1, position + 1, position + 3]
    ]
    return blockIndex[rotation]
}

export const blockPositionOnBoard = ({ redId, blueId, coinAId, coinBId }) => {
    const board = [...Array(16)].map(() => ({ style: "grey", coinA: false, coinB: false }))
    const redIndex = blockIdToBoardIndex(redId)
    const blueIndex = blockIdToBoardIndex(blueId)
    for (let i = 0; i < redIndex.length; i ++) {
        board[redIndex[i]].style = "red"
    }
    for (let i = 0; i < blueIndex.length; i ++) {
        if (board[blueIndex[i]].style === "red") {
            board[blueIndex[i]].style = "brown"
        } else {
            board[blueIndex[i]].style = "blue"
        }
    }
    board[coinAId].coinA = true
    board[coinBId].coinB = true
    return board
}

export const blockOnBlock = (board) => board.find(v => v.style === "brown" || 
    ((v.coinA || v.coinB) && v.style !== "grey") ||
    (v.coinA && v.coinB))

export const calculateWinner = (gameState) => {
    const { redId, blueId, coinAId, coinBId, move, coinSelect } = gameState
    let isBlockOnBlock
    let testBlockId = { position: 5, rotation: 0 }
    let testGameState
    let testBoardStyle
    let availableMoves = 0

    if (move === 0 || move === 3) {
        for (let i = 0; i < posTab.length; i++) {
            for (let j = 0; j < posTab[i].length; j++) {
                testBlockId.position = posTab[i][j]
                testBlockId.rotation = i
                if (move === 0) {
                    testGameState = {
                        redId: testBlockId,
                        blueId,
                        coinAId,
                        coinBId,
                        move, 
                        coinSelect
                    }
                } else if (move === 3) {
                    testGameState = {
                        redId,
                        blueId: testBlockId,
                        coinAId,
                        coinBId,
                        move, 
                        coinSelect
                    }
                }
                testBoardStyle = blockPositionOnBoard(testGameState)
                isBlockOnBlock = blockOnBlock(testBoardStyle)
                if (isBlockOnBlock === undefined) {
                    availableMoves += 1
                }
            }
        }
    }

    if (move === 0 && availableMoves <= 1) {
        return "blue"
    } else if (move === 3 && availableMoves <= 1) {
        return "red"
    } else {
        return null
    }
}