import React from 'react'
import Navbar from './Navbar'
import styles from './Header.module.scss'

const Header = () => {

    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    BOARD GAMES
                </div>
                <Navbar />
            </div>
        </header>
    )
}

export default Header