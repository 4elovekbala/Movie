import { useSelector } from "react-redux";
import css from './User.module.scss';

const User = () => {
   const { username, avatar } = useSelector(state => state.user);

   return (
      <div className={css.wrapper}>
         {
            avatar.tmdb.avatar_path 
            ? <img src={avatar.tmdb.avatar_path} alt={`user-${username}`} /> 
            : <div className={css.notImage}>{username[0]}</div>
         }
         <h1>{username}</h1>
      </div>
   );
}

export default User;