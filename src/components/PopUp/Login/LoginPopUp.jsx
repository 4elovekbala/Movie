import css from './LoginPopUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { getUserThunk } from '../../../store/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const LoginPopUp = ({ setLogin }) => {
   const { request_token, user } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = ({ login, password }) => {
      dispatch(getUserThunk({
         username : login,
         password : password,
         request_token,
      }));
   };
   
   useEffect(() => {
      if(user.success === true){
         setLogin(false);
      }
   }, [user.success])

   return (
      <>
         <div className={css.popUp}>
            <div className={css.popUpWrapper}>
               <div className={css.close}>
                  <FontAwesomeIcon onClick={() => setLogin(false)} icon={faTimesCircle} className={css.icon} />
               </div>
               <div className={css.popUpInner}>
                  <h1>Login</h1>
                  <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                     {(errors.login || errors.password) && <p className={css.incorrect}>Login or password incorrect</p>}
                     <p className={css.container}>
                        <label className={css.label}>Login</label>
                        <input className={css.input} placeholder="Login" type="text" {...register('login', { required: true })} />
                     </p>
                     <p className={css.container}>
                        <label className={css.label}>Password</label>
                        <input className={css.input} placeholder="Password" type="password" {...register('password', { required: true })} />
                     </p>
                     <button className={css.submit}>Submit</button>
                  </form>
               </div>
            </div>
         </div> 
      </> 
   );
}
export default LoginPopUp;