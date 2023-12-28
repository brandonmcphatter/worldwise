import {NavLink} from "react-router-dom";
import styles from './PageNav.module.css';
import Logo from "./Logo.jsx";
import {useAuth} from "../contexts/FakeAuthContext.jsx";

function PageNav() {
    const {isAuthenticated, logout} = useAuth();

    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to='/product'>Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    {isAuthenticated === false ?
                        <NavLink to="/login" className={styles.ctaLink}>Login</NavLink> :
                        <NavLink onClick={logout} to="/" className={styles.ctaLink}>Logout</NavLink>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;