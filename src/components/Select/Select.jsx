import css from './Select.module.scss';

const Select = ({arr, selectValueHandler, clickHandler, select, selectValue, vote, year, actors}) => {
   return (
      <ul className={`${css.select} ${vote ? css.vote : ""} ${year ? css.year : ""} ${actors ? css.actors : ""}`}>
         <li className={`${css.selectItem} ${css.block}`} onClick={clickHandler}>
            {selectValue}
         </li>
         {arr.map((item, index) => {
            return (
               <li 
                  className={`${css.selectItem} ${select ? css.block : ""}`} 
                  onClick={selectValueHandler} 
                  key={index} 
                  id={actors ? item.genderId : item.id}
               >{year ? item : item.name}</li>
            )
         })}
      </ul>
   );
}

export default Select;