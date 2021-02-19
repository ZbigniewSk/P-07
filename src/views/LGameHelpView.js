import React from 'react'
import styles from './LGameHelpView.module.scss'

const LGameHelpView = () => {

    return (
        <div className={styles.wrapper}>
            <ul><h2>L-Game's the most helpless help</h2>
                <li>
                    Space key/Turn button - red/blue block turn or coin select
                </li>
                <li>
                    Enter key/Enter button - go to next move
                </li>
                <li>
                    Arrow keys/Arrow buttons - move selected blocks
                </li>
            </ul>
        </div>
    )
}

export default LGameHelpView