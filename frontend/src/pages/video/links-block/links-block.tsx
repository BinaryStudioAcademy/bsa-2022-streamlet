import React, { FC } from 'react';
import styles from './styles.module.scss';

// currently just a placeholder that can be filled with any content in the future

// NOTE: if you plan to use Infinite scroll for recommendations,
// remember that on smaller screens the layout of video page collapses into one column
// and comments are bellow recommendations (as on youtube)
// so on smaller screen sizes don't use infinite scroll (i guess you could use media queries), because it will be impossible to reach comments
const LinksBlock: FC = () => {
  return <div className={styles['links-block']}></div>;
};

export { LinksBlock };
