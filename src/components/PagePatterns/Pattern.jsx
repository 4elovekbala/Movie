
import css from './Pattern.module.scss';
import { useState, useEffect } from 'react';
import { allgenres } from '../genres';
import { votes } from '../sortVotes';
import { year } from '../year';
import Select from '../Select/Select';
import Slider from "react-slick";
import SectionCard from '../SectionCard/SectionCard';
import MoreButton from '../MoreButton/MoreButton';


const Pattern = ({arr, fetching, fetchMovie, nameSort, voteSort, popularitySort, sortReset, title, resetSort}) => {
    // перемещивание массивов
   const shufle = () => {
      let newArray = allgenres.concat(votes).concat(year)
      return newArray.sort(() => Math.random() - 0.5);
   }

   // slider
   const settings = {
      infinite: true,
      speed: 200,
      slidesToShow: 8,
      slidesToScroll: 1,
      arrows : false,
      autoplay: true,
      autoplaySpeed: 800,
    };

   // state
   const [counter, setCounter] = useState(1);

   useEffect(() => {
      fetchMovie(counter);
   }, [counter])

   // Первый select лакальный state
   const [select, setSelect] = useState(false);
   const [selectValue, setSelectValue] = useState('Жанры');
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
      }
      else if(parseInt(selectVoteId) === 1){
         voteSort();
      }
      else if(parseInt(selectVoteId) === 2){
         popularitySort();
      } else {
         resetSort();
      }
   }, [selectVoteId]);

   // Третий select лакальный state
   const [select3, setSelect3] = useState(false);
   const [selectYearValue, setSelectYearValue] = useState('Годы');
   const [selectYearId, setSelectYearId] = useState(null);

   const yearClickHandler = () => {
      setSelect3(!select3);
   }

   const selectYearHandler = (e) => {
      setSelectYearId(e.currentTarget.id);
      setSelectYearValue(e.currentTarget.textContent);
      yearClickHandler();
   }
   // Функция сброса
   const resetHandler = () => {
      setSelectYearId(null);
      setSelectYearValue('Годы');
      setSelectValueId(null);
      setSelectValue('Жанры');
      sortReset();
   }
   // Фильтровка и сортировка через слайдер
   const setHandler = (item) => {
      if(item.id < 3){
         setSelectVoteId(item.id);
         setSelectVoteValue(item.name)
      } else if(item.id > 3){
         setSelectValueId(item.id);
         setSelectValue(item.name);
      } else if(!item.id){
         setSelectYearId(item)
         setSelectYearValue(item);
      } else {
         resetHandler();
      }
   }

   return (
      <>
      <h1 className={css.pageTitle}>{title}</h1>
      <div className={css.genresWrapper}>
         <div className={css.genresSlider}>
            <div className={css.genresSliderInner}>
               <Slider {...settings}>
                  {shufle().map((item, index) => <div key={index} 
                  className={css.sliderItem}
                  id={item.id ? item.id : item}
                  onClick={() => setHandler(item.id ? item : item)}>
                     {item.name ? item.name : item}
                  </div>)}
               </Slider>
            </div>
         </div>
         <div className={css.genresInputWrapper}>
            <Select 
               arr={allgenres} 
               selectValueHandler={selectValueHandler} 
               clickHandler={clickHandler}  
               select={select} 
               selectValue={selectValue}
            />
            <Select 
               arr={votes} 
               selectValueHandler={selectVoteHandler} 
               clickHandler={voteClickHandler}  
               select={select2} 
               selectValue={selectVoteValue}
               vote={true}
            />
            <Select 
               arr={year}
               selectValueHandler={selectYearHandler} 
               clickHandler={yearClickHandler}  
               select={select3} 
               selectValue={selectYearValue}
               year={true}
            />
            <button className={css.resetBtn} onClick={resetHandler}>Сбросить</button>
         </div>
      </div>
      <div className={css.wrapper}>
         { 
            fetching ? 
            arr.filter((item, index, arr) => {
               if (selectValueId !== null && selectYearId === null) {
                  if(item.genre_ids.includes(parseInt(selectValueId))){
                     return item;
                  } 
               } else if(selectYearId !== null && selectValueId === null) {
                   if(title === 'Сериалы'){
                      return parseInt(item.first_air_date.slice(0, 4)) === parseInt(selectYearValue);
                   }
                  return parseInt(item.release_date.slice(0, 4)) === parseInt(selectYearValue);
               } else if(selectValueId !== null && selectYearId !== null) {
                  if(item.genre_ids.includes(parseInt(selectValueId))){
                     if(title === 'Сериалы'){
                        return parseInt(item.first_air_date.slice(0, 4)) === parseInt(selectYearValue)
                     }
                     return parseInt(item.release_date.slice(0, 4)) === parseInt(selectYearValue);
                  } 
               } else {
                  return item;
               }  
            }).map((item, index) => {
                  return <SectionCard 
                        key={index} 
                        id={item.id}
                        title={item.original_title ? item.original_title : item.original_name} 
                        background={item.poster_path ? item.poster_path : item.backdrop_path} 
                        genre={item.genre_ids} 
                        country={item.origin_country} 
                        date={item.release_date ? item.release_date : item.first_air_date}
                        rate={item.vote_average}
                        panel={"panel"} 
                        actors={true}
                        mode={item.release_date ? 'фильмы' : 'сериалы'}
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

export default Pattern;