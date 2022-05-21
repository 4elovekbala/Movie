import css from './Header.module.scss';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
 
const Header = ({setLogin, setSearch}) => {
   return (
      <div className={css.headerContainer}>
         <header className={css.header}>
            <Navbar />
            <Search setSearch={setSearch} setLogin={setLogin} />
         </header>
      </div>
   );
}

export default Header;