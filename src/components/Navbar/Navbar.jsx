import css from './Navbar.module.scss';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
   return (
      <div className={css.linkWrapper}>
         <div className={css.logoContainer}>
            <NavLink className={css.linkItem} to="/">
               <FontAwesomeIcon className={css.logoItem} icon={faVideo} />
            </NavLink>
         </div>
         <nav className={css.navbar}>
            <ul className={css.navbarInner}>
               <li className={css.linkItemWrapper}>
                  <NavLink className={css.linkItem} to="/news">Что нового</NavLink>
               </li>
               <li className={css.linkItemWrapper}>
                  <NavLink className={css.linkItem} to="/movies">Фильмы</NavLink>
               </li>
               <li className={css.linkItemWrapper}>
                  <NavLink className={css.linkItem} to="/serials">Сериалы</NavLink>
                  </li>
               <li className={css.linkItemWrapper}>
                  <NavLink className={css.linkItem} to="/actors">Актеры</NavLink>
               </li>
            </ul>
         </nav>
      </div>
   );
}

export default Navbar;