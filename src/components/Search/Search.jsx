import css from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({search, setSearch}) => {
   return (
      <div onClick={() => setSearch(true)} className={css.searchWrapper}>
         <div className={css.search}>
            <span className={css.searchContainer}>
               <FontAwesomeIcon icon={faSearch} className={css.searchItem} /> Поиск
            </span>
         </div>
         <FontAwesomeIcon icon={faUserCircle} className={css.cabinetLogo} />
      </div>
   );
}

export default Search;