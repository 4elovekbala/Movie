import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './Arrows.module.scss';

export const NextArrow = ({ onClick }) => (
   <FontAwesomeIcon className={css.rightButton} onClick={onClick}  icon={faChevronRight} />
);
export const PreviousArrow = ({ onClick }) => (
   <FontAwesomeIcon className={css.leftButton} onClick={onClick}  icon={faChevronLeft} />
);