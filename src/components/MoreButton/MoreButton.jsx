import css from './MoreButton.module.scss';
const MoreButton = ({counter, setCounter}) => {
   return (
      <div className={css.btnWrapper}>
         <button className={css.btn} onClick={() => setCounter(counter + 1)}>More</button>
      </div>
   );
}
export default MoreButton;