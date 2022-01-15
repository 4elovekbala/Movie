import css from './Header.module.scss';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
 
const Header = ({search, setSearch}) => {
   return (
      <div className={css.headerContainer}>
         <header className={css.header}>
            <Navbar />
            <Search search={search} setSearch={setSearch} />
         </header>
      </div>
   );
}

export default Header;