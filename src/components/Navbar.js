import React from 'react'
import styles from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav>
            <div className={styles.wrapper}>
                <div className={styles.navItem}>
                    <NavLink 
                        exact
                        to="/"
                        className={styles.navItemLink}
                        activeClassName={styles.navItemLinkActive}
                    >
                        Main
                    </NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink 
                        exact
                        to="/lgame"
                        className={styles.navItemLink}
                        activeClassName={styles.navItemLinkActive}
                    >
                        L-Game
                    </NavLink>
                    <div className={styles.dropdown}>
                        <NavLink
                            exact 
                            to="/help"
                            className={styles.dropdownLink} 
                            activeClassName={styles.dropdownLinkActive}
                        >
                            Help
                        </NavLink>
                        <a 
                            href="https://en.wikipedia.org/wiki/L_game"
                            className={styles.dropdownLink}
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Rules (Wiki)
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar