import css from './ActorsPage.module.scss';
import { useState, useEffect } from 'react';
import { actorVotes } from '../actorVotes';
import { gender } from '../gender';
import Select from '../Select/Select';
import MoreButton from '../MoreButton/MoreButton';
import ActorCard from '../ActorCard/ActorCard';

const ActorsPage = ({arr, fetching, fetchMovie, nameSort, popularitySort, sortReset, title, resetSort}) => {
   // state
   const [counter, setCounter] = useState(1);

   useEffect(() => {
      fetchMovie(counter);
   }, [counter])

   // Первый select лакальный state
   const [select, setSelect] = useState(false);
   const [selectValue, setSelectValue] = useState('Пол');
   const [selectValueId, setSelectValueId] = useState(null);

   const clickHandler = () => {
      setSelect(!select);
   }

   const selectValueHandler = (e) => {
      setSelectValueId(e.currentTarget.id);
      setSelectValue(e.currentTarget.textContent);
      clickHandler();
   }

   // state для сортировки
   const [select2, setSelect2] = useState(false);
   const [selectVoteValue, setSelectVoteValue] = useState('Сортировка');
   const [selectVoteId, setSelectVoteId] = useState(null);

   const voteClickHandler = () => {
      setSelect2(!select2);
   }

   const selectVoteHandler = (e) => {
      setSelectVoteId(e.currentTarget.id);
      setSelectVoteValue(e.currentTarget.textContent);
      voteClickHandler();
   }

   useEffect(() => {
      if(parseInt(selectVoteId) === 0){
         nameSort();
      } else if(parseInt(selectVoteId) === 1){
         popularitySort();
      } else {
         resetSort();
      }
   }, [selectVoteId]);

   // Функция сброса
   const resetHandler = () => {
      setSelectValueId(null);
      setSelectValue('Пол');
      sortReset();
   }

   return (
      <>
      <h1 className={css.pageTitle}>{title}</h1>
      <div className={css.genresWrapper}>
         <div className={css.genresInputWrapper}>
            <Select 
               arr={gender} 
               selectValueHandler={selectValueHandler} 
               clickHandler={clickHandler}  
               select={select} 
               selectValue={selectValue}
               actors={true}
            />
            <Select 
               arr={actorVotes} 
               selectValueHandler={selectVoteHandler} 
               clickHandler={voteClickHandler}  
               select={select2} 
               selectValue={selectVoteValue}
               vote={true}
               actors={true}
            />
            <button className={css.resetBtn} onClick={resetHandler}>Сбросить</button>
         </div>
      </div>
      <div className={css.wrapper}>
         { 
            fetching ? 
            arr.filter((item, index, arr) => {
               if(selectValueId !== null){
                  return parseInt(item.gender) === parseInt(selectValueId);
               } else {
                  return item;
               }
            })
            .map((item, index) => {
                  return <ActorCard 
                     key={item.name} 
                     name={item.name} 
                     image={item.profile_path}
                     id={item.id}
                     movies={item.known_for}
                     fetching={fetching}
                  />
               }
            )
            :  <h1>Loading...</h1>
         }
      </div>
      <MoreButton counter={counter} setCounter={setCounter} />
      </>
   );
}

export default ActorsPage;