import css from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSessionIdThunk } from '../../store/AuthReducer';
import { getUserInfoThunk } from '../../store/UserReducer';

const Search = ({setLogin, setSearch}) => {
   const data = useSelector(state => state.auth);
   const userInfo = useSelector(state => state.user);
   const { user, session_id } = data;
   const dispatch = useDispatch();

   useEffect(() => {
      if(user.success){
         dispatch(getSessionIdThunk({request_token : user.request_token}));
      }
   }, [user])

   useEffect(() => {
      if(session_id.success){
         dispatch(getUserInfoThunk({session_id : session_id.session_id}));
      }
   }, [session_id])

   return (
      <div className={css.searchWrapper}>
         <div className={css.search}>
            <span onClick={() => setSearch(true)} className={css.searchContainer}>
               <FontAwesomeIcon icon={faSearch} className={css.searchItem} /> Поиск
            </span>
         </div>
         <span onClick={() => setLogin(true)} className={css.user}>
            {
               userInfo.success ? <>
                  <h1>{userInfo.username}</h1>
                  <p>Logout</p>
               </> : <FontAwesomeIcon icon={faUserCircle} className={css.cabinetLogo} />
            }
         </span>
      </div>
   );
}

export default Search;